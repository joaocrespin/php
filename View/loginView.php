<!DOCTYPE html>
<html>
    <head>
        <title>Despesitos</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossorigin="anonymous">
        <link rel="stylesheet" href="./css/styleLogin.css">
    </head>
    <body class="loginCadastro">
        <form class="pure-form pure-form-aligned"  method="POST" action="../Controller/login.php">
            <h1>Despesitos</h1>
            <h2>Login</h2>
            <fieldset>
                <div class="pure-control-group">
                    <input id="aligned-name" type="text" placeholder="E-mail" name="cx_email"/>
                </div>
                <div class="pure-control-group">
                    <input id="aligned-password" type="password" placeholder="Senha" name="cx_senha"/>
                </div>
                <div class="pure-control">
                    <button type="submit" class="pure-button pure-button-primary" name="bt1">Entrar</button>
                </div>

                <hr class="linha-divisoria">

                <div class="pure-control btLoginCadastro">
                    <button type="button" onclick="window.location.href='../View/cadastroView.php';" class="pure-button pure-button-primary" id="btCriarConta" name="bt2">Criar conta</button>
                </div>
            </fieldset>
        </form>

        <?php
        session_start();

        if (isset($_GET['error'])) {
            echo "Login falhou. Tente novamente.";
            
        } 

        // Exibe mensagens do sistema
        if (isset($_SESSION['mensagem'])) {
            echo "<script>alert('" . $_SESSION['mensagem'] . "');</script>";

            // Limpa a mensagem
            unset($_SESSION['mensagem']); 
        }
        ?>
    </body>
</html>