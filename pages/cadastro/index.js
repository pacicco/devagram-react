import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Botao from "../../componentes/botao";
import InputPublico from "../../componentes/inputPublico";
import UploadImagem from "../../componentes/uploadImagem";
import logotipo from "../../public/images/logotipo.svg";
import usuario from "../../public/images/usuario.svg";
import imagemEnvelope from "../../public/images/imagemEnvelope.svg";
import chave from "../../public/images/chave.svg";
import avatar from "../../public/images/avatar.svg"




export default function Cadastro() {
    const [imagem, setImagem] = useState (null);
    const [email, setEmail] = useState ("");
    const [nome, setNome] = useState ("");
    const [senha, setSenha] = useState ("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState ("");


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
                <form>
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
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="email"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                    />
                    <InputPublico
                        imagem={chave}
                        texto="senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                    />
                    <InputPublico
                        imagem={chave}
                        texto="Confirmar senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                        valor={confirmacaoSenha}
                    />
                <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabiltado={false}

                    />
                </form>
            <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora</Link>

                </div>
            </div>
        </section>
    )
} 
