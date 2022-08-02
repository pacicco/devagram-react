import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import imgSetaEsquerda from '../../public/images/setaEsquerda.svg';
import imgDeslogar from '../../public/images/deslogar.svg';
import CabecalhoComAcoes from '../cabecalhoComAcoes';
import Botao from '../botao';
import Avatar from '../avatar';
import UsuarioService from "../../services/UsuarioService";


const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({
    usuario,
    estaNoPerfilPessoal
}) {
    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();


    useEffect(() => {
        if (!usuario) {
            return;
        }

        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);

    }, [usuario]);

    const obterTextoBotaoPrincipal = () => {
        if (estaNoPerfilPessoal) {
            return 'Editar Perfil';
        }

        if (estaSeguindoOUsuario) {
            return 'Deixar de seguir';
        }

        return 'Seguir';
    }

    const obterCorDoBotaoPrincipal = () => {
        if (estaSeguindoOUsuario || estaNoPerfilPessoal) {
            return 'invertido';

        }

        return 'primaria';
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if (estaNoPerfilPessoal) {
            return router.push('/perfil/editar');
        }

        try {
            await usuarioService.alternarSeguir(usuario._id);
            setQuantidadeSeguidores(
                estaSeguindoOUsuario
                    ? (quantidadeSeguidores - 1)
                    : (quantidadeSeguidores + 1)
            );
            setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir!`);
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const deslogar = () => {
        usuarioService.deslogar();
        router.push('/');
    }

    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                <Image
                    src={imgDeslogar}
                    alt='icone deslogar'
                    onClick={deslogar}
                    width={23}
                    height={23}
                />
            );
        }

        return null;
    }

    return (
        <div className="cabecalhoPerfil largura30pctDesktop">
            <CabecalhoComAcoes
                iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                titulo={usuario.nome}
                elementoDireita={obterElementoDireitaCabecalho()}
            />

            <hr className="linhaDivisoria" />

            <div className="statusPerfil">
                <Avatar src={usuario.avatar} />
                <div className="informacoesPerfil">
                    <div className="statusContainer">
                        <div className="status">
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicacoes</span>
                        </div>

                        <div className='status'>
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className="status">
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>

                    </div>
                    <Botao
                        texto={obterTextoBotaoPrincipal()}
                        cor={obterCorDoBotaoPrincipal()}
                        manipularClique={manipularCliqueBotaoPrincipal}
                    />

                </div>

            </div>
        </div>
    )

}


