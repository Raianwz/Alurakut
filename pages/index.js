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

export default function Home() {
  const githubUser = 'raianwz';
  const [comunidades, setComunidades] = React.useState([{
    id: '0101010101010',
    title: 'Eu odeia acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
  }]);
  //  const comunidades = ['Alurakut'];
  const pessoasGit = ['Chatterino', 'joaocarloslima', 'omariosouto', 'peas']

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
<<<<<<< HEAD
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
=======
>>>>>>> 87855cc701d957fbd6f91ec2b447ca10b05245a7
          </Box>
        </div>
        <div className="comunityArea" style={{ gridArea: 'comunityArea' }}>
          <ProfileUsersBoxWrapper>
          <h2>Comunidades({comunidades.length})</h2>
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
            <h2>Usuários da comunidade({pessoasGit.length})</h2>
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
