const selectedTagsWrapper = document.querySelector('.selected-tags'),
selectedTagsBox = document.querySelector('.selected-tags-box'),
clearBtn = document.querySelector('.clear-btn'),
jobListBox = document.querySelector('.list-box');

const selectedTagsArr = [];

selectedTagsBox.addEventListener('click', (e)=>{
    if(e.target.classList.contains('close')|| e.target.classList.contains('close-btn')){

        if(e.target.classList.contains('close-btn')){
            const idx = selectedTagsArr.indexOf(e.target.parentElement.previousElementSibling.textContent.toLocaleLowerCase());
            selectedTagsArr.splice(idx, 1)

            selectedTagsBox.removeChild(e.target.parentElement.parentElement);
            

            if(selectedTagsBox.children.length==0){
                selectedTagsWrapper.classList.add('none');
            }

        }else if(e.target.classList.contains('close')){
            const idx = selectedTagsArr.indexOf(e.target.previousElementSibling.textContent.toLocaleLowerCase());
            selectedTagsArr.splice(idx, 1);

            selectedTagsBox.removeChild(e.target.parentElement);

            if(selectedTagsBox.children.length==0){
                selectedTagsWrapper.classList.add('none');
        }}

        jobListBox.childNodes.forEach(li=>{
            const filterArr = [];
            if(li.lastChild){
                li.lastChild.childNodes.forEach(btn=>{
                    filterArr.push(btn.innerText.toLocaleLowerCase());
                })

                if(selectedTagsArr.every(e=>filterArr.includes(e))){
                    li.classList.remove('none');
                }else{
                    li.classList.add('none');
                }
                
            }
        })
    }
})


clearBtn.addEventListener('click', ()=>{
    while (selectedTagsBox.hasChildNodes()) {
        selectedTagsBox.removeChild(selectedTagsBox.firstChild);
        selectedTagsArr.pop();
    };
    selectedTagsWrapper.classList.add('none');

    jobListBox.childNodes.forEach(li=>{
        const filterArr = [];
        if(li.lastChild){
            li.lastChild.childNodes.forEach(btn=>{
                filterArr.push(btn.innerText.toLocaleLowerCase());
            })

            if(selectedTagsArr.every(e=>filterArr.includes(e))){
                li.classList.remove('none');
            }else{
                li.classList.add('none');
            }
            
        }
    })
})


jobListBox.addEventListener('click', (e)=>{
    if(e.target.classList.contains('tag')){
        selectedTagsWrapper.classList.remove('none');
        const btnsDiv = document.createElement('div');
        btnsDiv.classList.add('btns-container');

        const tagBtn = document.createElement('button');
        tagBtn.classList.add('tag');
        tagBtn.textContent = e.target.textContent;
        btnsDiv.append(tagBtn);

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML =`
            <img src="images/icon-remove.svg" alt="close" class="close-btn">
        `;
        closeBtn.classList.add('close');
        btnsDiv.append(closeBtn);


        if(!selectedTagsArr.includes(btnsDiv.children[0].textContent.toLocaleLowerCase())){
            selectedTagsArr.push(btnsDiv.children[0].textContent.toLocaleLowerCase());
            selectedTagsBox.append(btnsDiv);
        }


        jobListBox.childNodes.forEach(li=>{
            const filterArr = [];
            if(li.lastChild){
                li.lastChild.childNodes.forEach(btn=>{
                    filterArr.push(btn.innerText.toLocaleLowerCase());
                })
                
                if(selectedTagsArr.every(e=>filterArr.includes(e))){
                    li.classList.remove('none');
                }else{
                    li.classList.add('none');
                }
            }
        })
    }
})


async function getData(){
    const data = await fetch('data.json');
    const result = await data.json();
    
    for (let i = 0; i < result.length; i++) {
        const li = document.createElement('li');
        li.classList.add('card');
        if(result[i].featured){
            li.classList.add('featured-card');
        }
        const firstDiv = document.createElement('div');
        firstDiv.innerHTML= `
            <div class="job-info">
                <img src="${result[i].logo}" alt="${result[i].company}" class="company-logo">
                <div>
                    <div class="job-features">
                        <h3 class="company-name">${result[i].company}</h3>
                        <button class=${result[i].new == true? "new": "none"}>new!</button>
                        <button class=${result[i].featured == true? "featured": "none"}>featured</button>
                    </div>
                    <a href="#">
                    <h3 class="job-position">
                    ${result[i].position}
                    </h3>
                    </a>
                    <div class="job-conditions">
                        <p class="post-time">${result[i].postedAt}</p>
                        <p class="contract">${result[i].contract}</p>
                        <p class="location">${result[i].location}</p>
                    </div>
                </div>
            </div>
        `;
        
        li.append(firstDiv);
        const secondDiv = document.createElement('div');
        secondDiv.classList.add('tags-container');
        
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('mobile-only', 'line');
        li.append(lineDiv);

        const roleBtn = document.createElement('button');
        roleBtn.classList.add('tag');
        roleBtn.textContent = result[i].role;
        secondDiv.append(roleBtn);

        const levelBtn = document.createElement('button');
        levelBtn.classList.add('tag');
        levelBtn.textContent = result[i].level;
        secondDiv.append(levelBtn);

        for (let j = 0; j < result[i].languages.length; j++) {
            const langBtn = document.createElement('button');
            langBtn.classList.add('tag');
            langBtn.textContent = result[i].languages[j];
            secondDiv.append(langBtn);
        }

        for (let m = 0; m < result[i].tools.length; m++) {
            const toolBtn = document.createElement('button');
            toolBtn.classList.add('tag');
            toolBtn.textContent = result[i].tools[m];
            secondDiv.append(toolBtn);
        }
        li.append(secondDiv);
        
        jobListBox.append(li)
    }
}

window.addEventListener('load', getData);
