<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body {
            background-color: #f1f1f1;
            display: grid;
            justify-content: center;
        }

        .row {
            display: flex;
            /* grid-template-columns: auto auto auto auto auto auto auto auto auto auto; */
            padding: 10px;
            margin: 5px 0;
        }

        .op {
            display: flex;
            padding: 10px;
            margin: 5px 0;
        }

        .player1,
        .player2,
        .playerx {
            display: block;
            width: 90px;
            justify-content: center;
            align-items: center;
            margin-left: -20px;
        }

        .cover {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: none;
            justify-content: center;
            align-items: center;
            background-color: lime;
        }

        button {
            padding: 10px;
            border-radius: 10px;
        }

        .cover p {
            font-size: 35px;
            color: brown;
        }

        .choice {
            z-index: 5;
            width: 60px;
            height: 100px;
            display: none;
            margin-right: 20px;
        }

        .choice img {
            border: 2px solid black;
            border-radius: 10px;
            width: 40px;
            padding: 5px;
            margin: 5px;
        }

        canvas{
            border: 3px solid black;
             margin-right: 40px
        }
        .cong{
                grid-template-columns: auto auto;
          }

        @media (max-width: 700px){
            .op{
                display: flex;
                margin-left: 5%;

            }
            .row{
                margin-left: 10%;
            }
            .player1,
            .player2,
            .playerx {
                width: 60px;
                justify-content: center;
                align-items: center;
                margin-left: -30px;
            }

            canvas{
             border: 3px solid black;
            }

            .cong img{
                margin-left: -50px;
            }
            .cong{
                grid-template-columns: auto auto;
            }
            .choice {
              margin-right: -10px;
              grid-template-columns: auto auto auto auto;
            }

            .choice img {
                width: 40px;
                padding: 2px;
                margin: 2px;
            }

        }
    </style>
</head>

<body>
    <div class="row" id="player1Cards">
        <div class="" style="display: none"></div>
    </div>

    <div class="op">
        <div class="choice">
            <img src="https://cutewallpaper.org/24/red-diamond-png/admissions-red-diamond-shape-png-free-transparent-png-download-pngkey.png"
                class="choice1" id=0>
            <img src="https://cdn-icons-png.flaticon.com/512/17/17807.png" class="choice1" id=1>
            <img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png" class="choice1" id=2>
            <img src="https://cdn-icons-png.flaticon.com/512/1392/1392918.png" class="choice1" id=3>

        </div>

        <canvas id="canvas"  style=""></canvas>

        <div class="cong" style="">
            <img src="https://i.pinimg.com/736x/0e/5f/f1/0e5ff160c652d000ebb409a754653d23.jpg" width="100px" id="pick"
                class="playerx" />
        </div>

    </div>

    <div class="row" id="player2Cards">
        <div class="" style="display: none"></div>

    </div>

    <a href="index.php" style="margin-left: 50px">Restart</a>

    <div class="cover">
        <p id="message"></p>
        <a href="index.php">Play Again</a>
    </div>


    <script src="index.js"></script>
</body>

</html>
