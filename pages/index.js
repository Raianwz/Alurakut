import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileUsersBoxWrapper } from '../src/components/ProfileUsersCommunity'
function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Imagem de Perfil" style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileCommunityBox(props) {
  let total = null;
  if(props.type === 'followers'){
      total = props.total
  }
  return (
    <ProfileUsersBoxWrapper>
      <h2 className="smallTitle">{props.title}({total===null?props.items.length:total})</h2>
      <ul>
        {props.items.slice(0, 6).map((itemAtual) => {
          let imgUrl = itemAtual.imageUrl
          let title = itemAtual.title
          if (props.type === 'followers') {
            imgUrl = itemAtual.avatar_url
            title = itemAtual.login
          }
          return (
            <li key={itemAtual.id}>
              <a href={`/${props.type}/${itemAtual.id}`}>
                <img src={imgUrl} alt={title} />
                <span>{title}</span>
              </a>
            </li>
          )
        })

        }
      </ul>
    </ProfileUsersBoxWrapper>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasGit = ['Chatterino', 'joaocarloslima', 'omariosouto', 'peas', 'diolinux']
  const [seguidores, setSeguidores] = React.useState([]);
  const [totalFollowers, setTotalFollowers] = React.useState([]);

  React.useEffect(() => {
    //Get GitHub api
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((respServidor) => {
        return respServidor.json();
      })
      .then((respFull) => {
        setSeguidores(respFull)
        console.log(respFull)
      })
    fetch(`https://api.github.com/users/${githubUser}`)
      .then((respServidor) => {
        return respServidor.json();
      })
      .then((respFT) => {
        const total = respFT.followers
        setTotalFollowers(total)
      })



    //Api GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '431dfa84b0df0fc5c4d528a1a56e96',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query{
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`})
    })
      .then((response) => response.json())
      .then((respFull) => {
        const comunidadesDato = respFull.data.allCommunities
        setComunidades(comunidadesDato)
      })
  }, [])
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">Formulário</h2>
            <form onSubmit={function handleCreateComunity(e) {
              e.preventDefault();
              const dadosForm = new FormData(e.target);
              console.log('Campo: ', dadosForm.get('title'))
              console.log('Campo: ', dadosForm.get('image'))
              const comunidade = {
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                creatorSlug: githubUser,
              }
              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              }).then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado)
                const comunidade = dados.registroCriado
                const comunidadeAtualziadas = [...comunidades, comunidade]
                setComunidades(comunidadeAtualziadas)
              })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da Comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da Comunidade?" />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa" />
              </div>
              <button>Criar Comunidade</button>
            </form>
          </Box>
        </div>
        <div className="communityArea" style={{ gridArea: 'communityArea' }}>
          <ProfileCommunityBox title={"Comunidades"} items={comunidades} type={'communities'} total={null}/>
          <ProfileCommunityBox title={"Seguidores"} items={seguidores} type={'followers'} total={totalFollowers}/>
          <ProfileUsersBoxWrapper>
            <h2 className="smallTitle">Usuários da comunidade({pessoasGit.length})</h2>
            <ul>
              {pessoasGit.map((itemAtual) => {

                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileUsersBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  console.log('Token decodificado:', jwt.decode(token))
  const { isAuthenticated } = await fetch('https://alurakut-delta-mocha.vercel.app/api/auth', { 
    headers: { 
      'Authorization': token 
    } 
  })
    .then((resp) => resp.json())
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      }
    }
  }
  const { githubUser } = jwt.decode(token)
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}