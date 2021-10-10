//récupération de l'ID de l'ourson de la page
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(id);

const getTeddies = async function() {
     // récupération des données du teddy sélectionné par son id
    try {
        let response = await fetch('http://localhost:3000/api/teddies/' + id);
        if (response.ok) {
            let teddy = await response.json();
            console.log(teddy);

            // création h2 de la page
            const teddyMain = document.getElementById('product_page');
            const teddyH2 = document.createElement('h2');
            teddyMain.appendChild(teddyH2);
            teddyH2.textContent = "Vous présente " + teddy.name;

            // création div de l'ourson
            const teddyDiv = document.createElement('div');
            teddyMain.appendChild(teddyDiv);
            teddyDiv.className = 'teddy_ref';

            //ajout image à la div ourson
            const teddyImg = document.createElement('img');
            teddyDiv.appendChild(teddyImg);
            teddyImg.setAttribute('src', teddy.imageUrl);
            teddyImg.setAttribute('alt', 'Ours en peluche ' + teddy.name);
            teddyImg.setAttribute('title', 'Ours en peluche ' + teddy.name);

            //création div de présentation
            const teddyDivInfo = document.createElement('div');
            teddyDiv.appendChild(teddyDivInfo);
            teddyDivInfo.className = 'teddy_info';

            // ajout nom teddy
            const teddyH3 = document.createElement('h3');
            teddyDivInfo.appendChild(teddyH3);
            teddyH3.textContent = teddy.name;

            // ajout description
            const teddyPar = document.createElement('p');
            teddyDivInfo.appendChild(teddyPar);
            teddyPar.textContent = teddy.description;

            // ajout prix
            const teddyPrice = document.createElement('p');
            teddyDivInfo.appendChild(teddyPrice);
            teddyPrice.textContent = "Son prix : " + teddy.price / 100 + " €";
            teddyPrice.className = 'teddy_price';

            // création choix couleur
            const form = document.createElement('form');
            teddyDivInfo.appendChild(form);
            const formDiv = document.createElement('div');
            form.appendChild(formDiv);
            formDiv.className = 'colors_choice';

            const label = document.createElement('label');
            formDiv.appendChild(label);
            label.textContent = "Personnalisez sa couleur : ";
            label.setAttribute('for', "Choix de couleurs de " + teddy.name);

            const select = document.createElement('select');
            formDiv.appendChild(select);
            select.setAttribute('name', "Choix de couleurs de " + teddy.name);
            select.setAttribute('id', "select_1 ");

            // ajout des différentes couleurs 
            const colors = teddy.colors;

            for (i = 0; i < colors.length; i++) {
                const selectOption = document.createElement('option');
                select.appendChild(selectOption);
                selectOption.textContent = colors[i];
                selectOption.setAttribute("value", colors[i]);
            }
            
            // création bouton panier
            let addTeddy = document.createElement('button');
            form.appendChild(addTeddy);
            addTeddy.type = 'submit';
            addTeddy.name = 'add';
            addTeddy.id = 'submit';
            addTeddy.textContent = "Ajouter au panier"

            // récupérations données et envoie au panier
            addTeddy.addEventListener("click", function (event) {
                event.preventDefault();

            // stockage des données du/des teddy souhaité dans localStorage
                let teddiesChoosen = {
                    teddyName: teddy.name,
                    teddyId: teddy._id,
                    teddyColor: select.value,
                    quantity: 1,
                    teddyPrice: teddy.price / 100,
                };
                console.log(teddiesChoosen);

                let storedTeddies = JSON.parse(localStorage.getItem('newArticle'));
                const teddyColor = select.value;
                if(storedTeddies) {
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                } else {
                    storedTeddies = [];
                    storedTeddies.push(teddiesChoosen);
                    localStorage.setItem('newArticle', JSON.stringify(storedTeddies));
                    console.log(storedTeddies);
                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté. Souhaitez vous consulter votre panier ?')) { 
                        window.location.href = "panier.html";
                    } else {
                        window.location.href = "index.html";
                    }
                }
            });
        } else {
            console.error('Retour du serveur : ', response.status);
            alert('Erreur rencontrée : ' + response.status);
        } 
    } catch (error) {
        alert("Erreur : " + error);
    }
};

//appel de la fonction getTeddies
getTeddies();

/*else if (storedTeddies && teddiesChoosen == storedTeddies) {
    const findTeddy = teddy.find(x => x['_id'] === id);
    console.log(findTeddy);
}*/ 