import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileUsersBoxWrapper } from '../src/components/ProfileUsersCommunity'
function ProfileSidebar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Imagem de Perfil" style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'raianwz';
  const pessoasGit = ['Chatterino', 'joaocarloslima', 'omariosouto']
  const jogosFavoritos = [
    'Sonic Mania',
    'Minecraft',
    'GarrysMod',
    'BattleBlock Theater'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />g
          </Box>
        </div>
        <div className="comunityArea" style={{ gridArea: 'comunityArea' }}>
          <ProfileUsersBoxWrapper>
            <h2>Usuários da comunidade({pessoasGit.length})</h2>
            <ul>
              {pessoasGit.map((itemAtual) => {

                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
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
