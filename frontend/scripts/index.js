const getTeddies =  async function() {
  //récupération des données de l'API 
  try {
      let response = await fetch('http://localhost:3000/api/teddies/');
      if (response.ok) {
          let teddies = await response.json();
          console.log(teddies);

          for (let teddy of teddies) {
              const teddiesDiv = document.getElementById('teddies');
      
              //création section "teddy"
              const teddiesSection = document.createElement('section');
              teddiesDiv.appendChild(teddiesSection);
              teddiesSection.className = 'teddy';
      
              //création lien vers produit.html pour chaque section
              const productLink = document.createElement("a");
              productLink.href = "produit.html?id=" + teddy._id;
              teddiesSection.appendChild(productLink);
              productLink.className = 'section_zoom';
              productLink.setAttribute('title', "L'ourson " + teddy.name + " vous attend !");
      
              //création image Teddy + src, alt et title
              const teddyImg = document.createElement('img');
              productLink.appendChild(teddyImg);
              teddyImg.setAttribute('src', teddy.imageUrl);
              teddyImg.setAttribute('alt', 'Ours en peluche ' + teddy.name);
              teddyImg.setAttribute('title', 'Ours en peluche ' + teddy.name);
      
              //création div teddyRef
              const teddiesRef = document.createElement('div');
              productLink.appendChild(teddiesRef);
              teddiesRef.className = 'teddies_ref';
      
              //création h3 de teddyRef
              const h3TeddiesRef = document.createElement('h3');
              teddiesRef.appendChild(h3TeddiesRef);
              h3TeddiesRef.textContent = teddy.name;
      
              //création p de teddyRef
              const pTeddiesRef = document.createElement('p');
              teddiesRef.appendChild(pTeddiesRef);
              pTeddiesRef.textContent = teddy.price / 100 + " €";
          }
      } 
      else {
          console.error('Retour du serveur : ', response.status);
          alert('Erreur rencontrée : ' + response.status);
      } 
  } 
  catch (error) {
      alert("Erreur : " + error);
  }
}

//appel de la fonction getTeddies
getTeddies();