

//quand un utilisateur viens sur notre page il a le bouton jouer sur le quel il peut cliquer pour commencer le jeu
//si il clique:
     //et qu'il ne jouait pas:
         // le compteur caché avec display none doit s'afficher et le compteur decremente de 60 à 0 seconde,seconde après seconde
            //si on arrive à 0 sec, Game over s'affiche qui est initialement display none,dans la box Game over on mentionne 'Game Over,votre score est de ...' ,la box pour l'instruction passe à display none pour plus de place pour la box game over
            //et meme si il clique sur une reponse après lecoulement du temps, rien ne dois se passer
         //le nom de notre bouton jouer change pour avoir le nom:'Relancer' s'il veut reset la partie
         //on genere une nouvelle multiplication qu'il doit faire les chiffres à multiplier doivent varier entre 1 et 10
         //on genere aussi 4 reponses possible avec la bonne faisant partie
         //a chaque fois qu'il a une bonne reponse: 
              //on augmente son score de 1, le score se trouve dans un span dans lelement score,
              //et on fait apparaitre la box 'exact' pour 1sec et puis disparait,
              //on genere un nouveau calcul à faire et 4 choix possibles, 
         //s'il ne trouve pas 
              //la box 'essaies encore' sort pour une seconde et disparait,
              //on ne genere pas dans ce cas de nouvelle QR, on lui laisse faire un autre choix,
              // s'il finit par trouver on genere une nouvelle QR

    //s'il jouait deja et qu'il clique sur le bouton jouer et qui aurait dans ce cas le texte Relancer, on reload notre page,avec le score à 0,le compteur caché et aucun calcul à faire,on attent qu'il clique sur jouer pour repartir

  

    document.addEventListener('DOMContentLoaded', function () {
        //reference aux element html qu'on va utiliser
        const choix = document.querySelector('.choix');
        const scoreElement = document.getElementById('scoreValue');
        const tempsRestantElement = document.getElementById('temps-restant');
        const compteurElement = document.querySelector('.compteur');
        const jouerRelancerBtn = document.querySelector('.jouer-relancer');
        const gameoverElement = document.querySelector('.game-over');
        const afaireElement = document.querySelector('.afaire');
        
        //declaration et iniatilisation de variables
        let score = 0;
        let tempsRestant = 60;
        let timer;
        let gestionnaireClicAjoute = false;
    
        function ajouterGestionnaireClic() {
            const boxElements = document.querySelectorAll('.box');
    
            boxElements.forEach((box, index) => {
                box.addEventListener('click', () => {
                    const reponseCorrecte = eval(afaireElement.textContent);
                    if (parseInt(box.textContent) === reponseCorrecte) {
                        score++;
                        scoreElement.textContent = score;
                        document.querySelector('.exact').style.display = 'block';
                        setTimeout(() => {
                            document.querySelector('.exact').style.display = 'none';
                        }, 1000);
                        genererNouvelleQuestion();
                    } else {
                        document.querySelector('.try-again').style.display = 'block';
                        setTimeout(() => {
                            document.querySelector('.try-again').style.display = 'none';
                        }, 1000);
                    }
                });
            });
            gestionnaireClicAjoute = true;
        }
    
        function genererNouvelleQuestion() {
            if (!gestionnaireClicAjoute) {
                ajouterGestionnaireClic();
            }
            const nombre1 = Math.floor(Math.random() * 10) + 1;
            const nombre2 = Math.floor(Math.random() * 10) + 1;
            const reponseCorrecte = nombre1 * nombre2;
            afaireElement.textContent = `${nombre1} * ${nombre2}`;
    
            const reponses = [reponseCorrecte];
            while (reponses.length < 4) {
                const reponseAleatoire = Math.floor(Math.random() * 100) + 1;
                if (!reponses.includes(reponseAleatoire)) {
                    reponses.push(reponseAleatoire);
                }
            }
    
            reponses.sort(() => Math.random() - 0.5);
    
            const boxElements = choix.querySelectorAll('.box');
            boxElements.forEach((box, index) => {
                box.textContent = reponses[index];
            });
        }
    
        jouerRelancerBtn.addEventListener('click', () => {
            if (jouerRelancerBtn.textContent === 'Jouer') {
                jouerRelancerBtn.textContent = 'Relancer';
                genererNouvelleQuestion();
                compteurElement.style.display = 'block';
                tempsRestant = 60;
                tempsRestantElement.textContent = tempsRestant;
                timer = setInterval(() => {
                    tempsRestant--;
                    tempsRestantElement.textContent = tempsRestant;
                    if (tempsRestant === 0) {
                        clearInterval(timer);
                        gameoverElement.style.display = 'block';
                        afaireElement.style.display = 'none';
                        choix.style.pointerEvents = 'none';
                        document.getElementById('scoreGameOver').textContent = score;
                    }
                }, 1000);
            } else {
                location.reload();
            }
        });
    });
    