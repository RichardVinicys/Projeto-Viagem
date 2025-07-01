var map = L.map('map').setView([20, 0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);



fetch('http://localhost:3000/mapa/ponto')
    .then(dados => dados.json())
    .then(pontos => pontos.forEach(el => {
        const coordenada = el.coordenada.split(',')

        L.marker([coordenada[0], coordenada[1]]).addTo(map)
            .bindPopup(`

               <p>
               <strong>${el.nome}</strong><br><br>
               ${el.endereco}<br><br>
               ${el.status}
               
               </p>
                
                
            `);
    }))
