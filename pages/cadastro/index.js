import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../../componentes/botao";
import InputPublico from "../../componentes/inputPublico";
import UploadImagem from "../../componentes/uploadImagem";
import { validarEmail, validarSenha, validarNome, validarConfirmacaoSenha } from '../../utils';
import UsuarioService from '../../services/UsuarioService';


import logotipo from "../../public/images/logotipo.svg";
import usuario from "../../public/images/usuario.svg";
import imagemEnvelope from "../../public/images/imagemEnvelope.svg";
import chave from "../../public/images/chave.svg";
import avatar from "../../public/images/avatar.svg";
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();


export default function Cadastro() {
    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const router = useRouter();

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmacaoSenha)
        );
    }


    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);

            if (imagem?.arquivo) {
                corpoReqCadastro.append("file", imagem.arquivo);

            }

            await usuarioService.Cadastro(corpoReqCadastro);
            await usuarioService.login({
                login: email,
                senha
            });

            router.push('/');
        } catch (error) {
            alert("Erro ao cadastrar usuario." + error?.response.data?.erro);
        }

        setEstaSubmetendo(false);

    }


    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={logotipo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    {<UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || avatar.src}
                        setImagem={setImagem}
                    />}


                    <InputPublico
                        imagem={usuario}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="email"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O email informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />
                    <InputPublico
                        imagem={chave}
                        texto="senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa de pelos menos 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <InputPublico
                        imagem={chave}
                        texto="Confirmar senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                        valor={confirmacaoSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmacaoSenha && !validarConfirmacaoSenha(senha, confirmacaoSenha)}
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabiltado={!validarFormulario() || estaSubmetendo}

                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora</Link>

                </div>
            </div>
        </section>
    );


} 
