let skillsContainer =  document.querySelector("#skillsWrapper");

//passando o src ou url de onde quero pegar os dados
fetch("./src/json/skills.json").then((response) =>{
response.json().then((dadosSkills)=>{
    dadosSkills.skills.map((skill) =>{          
                                                        //template string
        skillsContainer.innerHTML +=  `<p class="skill">${skill}</p> `;
    })
})
})