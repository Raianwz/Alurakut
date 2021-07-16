import React from 'react'
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
  return (
    <ProfileUsersBoxWrapper>
      <h2 className="smallTitle">{props.title}({props.items.length})</h2>
    </ProfileUsersBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'raianwz';
  const [comunidades, setComunidades] = React.useState([{
    id: '0101010101010',
    title: 'Eu odeia acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);
  const pessoasGit = ['Chatterino', 'joaocarloslima', 'omariosouto', 'peas']
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() => {
    fetch('https://api.github.com/users/Raianwz/followers')
      .then((respServidor) => {
        return respServidor.json();
      })
      .then((respFull) => {
        setSeguidores(respFull)
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
                id: new Date().toISOString(),
                title: dadosForm.get('title'),
                image: dadosForm.get('image'),
              }
              const comunidadeAtualziadas = [...comunidades, comunidade]
              setComunidades(comunidadeAtualziadas)
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
          <ProfileCommunityBox title={"Seguidores"} items={seguidores} />
          <ProfileUsersBoxWrapper>
            <h2 className="smallTitle">Comunidades({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileUsersBoxWrapper>
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
