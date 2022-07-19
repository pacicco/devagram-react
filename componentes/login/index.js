import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputPublico from "../inputPublico";
import Botao from "../botao";
import imagemEnvelope from "../../public/images/imagemEnvelope.svg";
import chave from "../../public/images/chave.svg";
import logotipo from "../../public/images/logotipo.svg"


export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image
                    src={logotipo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form>

                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
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

                    <Botao
                        texto="login"
                        tipo="submit"
                        desabilitado={false}

                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora</Link>

                </div>


            </div>

        </section>

    );
}
