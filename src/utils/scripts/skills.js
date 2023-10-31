let skillsContainer =  document.querySelector("#skillsWrapper");
console.log(skillsContainer);

//passando o src ou url de onde quero pegar os dados
fetch("./src/json/skills.json").then((response) =>{
response.json().then((dadosSkills)=>{
    console.log(dadosSkills.skills);
    dadosSkills.skills.map((skill) =>{          
                                                        //template string
        skillsContainer.innerHTML +=  `<p class="skill">${skill}</p> `;
        console.log(skill);
    })
})
})