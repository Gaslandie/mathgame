

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
        
        //ajout gestionnaire de clic 
        function ajouterGestionnaireClic() {
            const boxElements = document.querySelectorAll('.box');
            
            //pour chaque box, quand on clique , si la reponse est correcte , on augmente le score,on affiche exact pour une seconde, sinon on demande au joueur de reessayer
            boxElements.forEach((box, index) => {
                box.addEventListener('click', () => {
                    const reponseCorrecte = eval(afaireElement.textContent);
                    if (parseInt(box.textContent) === reponseCorrecte) {//convertir notre string en int et comparer la valeur et le type a reponsecorrecte
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
            gestionnaireClicAjoute = true; //à ce niveau le gesionnaireclicAjoute est à true car on vient de cliquer sur une box
        }
        //generer une nouvelle question,si le gestionnaireClicAjouter est false, apler la fonction ajouterGestionnaireClic
        function genererNouvelleQuestion() {
            if (!gestionnaireClicAjoute) {
                ajouterGestionnaireClic();
            }
            //generer deux nombres aleatoires entre 1 et 10 
            const nombre1 = Math.floor(Math.random() * 10) + 1;
            const nombre2 = Math.floor(Math.random() * 10) + 1;
            //la reponse correcte biensur est le produit
            const reponseCorrecte = nombre1 * nombre2;
            afaireElement.textContent = `${nombre1} * ${nombre2}`; //dans notre afaire on affiche le produit à faire
    
            const reponses = [reponseCorrecte]; //on declare et initialise notre tableau reponses avec la reponse correcte dans un premier temps
            while (reponses.length < 4) { //tant qu'on a pas nos 4 valeurs, genere moi un nombre entre 1 et 100
                const reponseAleatoire = Math.floor(Math.random() * 100) + 1;
                if (!reponses.includes(reponseAleatoire)) {//pour ne pas avoir un nombre qui se repete
                    reponses.push(reponseAleatoire);
                }
            }
    
            reponses.sort(() => Math.random() - 0.5); //une façon de melanger le contenu de notre tableau reponses
    
            const boxElements = choix.querySelectorAll('.box');
            boxElements.forEach((box, index) => {//index pour index on met chaque element de notre reponses dans chak box
                box.textContent = reponses[index];
            });
        }
        //ajout d'ecouteur devenement quand on clique sur le bouton jouer ou relancer
        jouerRelancerBtn.addEventListener('click', () => {
            if (jouerRelancerBtn.textContent === 'Jouer') {//si on commence le jeu, on change jouer à relancer
                jouerRelancerBtn.textContent = 'Relancer';
                genererNouvelleQuestion();//on genere une nouvelle question
                compteurElement.style.display = 'block';//on affiche le compteur avec 60 au depart puis decrementé seconde après seconde
                tempsRestant = 60;
                tempsRestantElement.textContent = tempsRestant;
                timer = setInterval(() => { //stocker dans la variable timer pour pouvoir le stopper par la suite une fois à 0 sec
                    tempsRestant--;
                    tempsRestantElement.textContent = tempsRestant;
                    if (tempsRestant === 0) { //lorsqu'on est à 0 seconde
                        clearInterval(timer);//on arrete le timer à 0 sec
                        gameoverElement.style.display = 'block'; //on afficher game over
                        afaireElement.style.display = 'none'; //on affiche pas lelement afaire
                        choix.style.pointerEvents = 'none'; //nos box ne soit pas cliquable
                        document.getElementById('scoreGameOver').textContent = score; //et on affiche le score
                    }
                }, 1000);
            } else {
                location.reload();// si non si on clique sur relancer, on recharge la page
            }
        });
    });
    