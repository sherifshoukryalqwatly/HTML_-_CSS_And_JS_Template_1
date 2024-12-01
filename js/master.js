//Check If Their Is Local Storage Color Option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color",mainColor);

     //Remove Active Class From All colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        
        //Add Active Class On Element With Data Color === Local Storage
        if(element.dataset.color === mainColor) {
            element.classList.add("active");
        };
    });
}

//Random Background Option
let backgroundOption = true; 


//Variable To Control The Background Interval
let backgroundIntrval;

//Check if there is llocal storage random background item
let backgroundLocalItem = localStorage.getItem("backgroundOption");

//check if random background in not empty
if (backgroundLocalItem !== null) {
    //remove active calss from all spans 
    document.querySelectorAll(".random-background span").forEach((e) => {
        e.classList.remove("active");
    });

    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
        document.querySelector(".random-background .yes").classList.add("active");
    }else {
        backgroundOption = false;
        document.querySelector(".random-background .no").classList.add("active");

    }
}

//Click On Icon Settings Gear
document.querySelector(".toggle-settings .icon").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};

//Switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

//Loop in Lis
colorsLi.forEach((li) => {
    //Click On Evry List Item
    li.addEventListener('click',(e) => {

        //Set color On Root 
        document.documentElement.style.setProperty("--main-color",e.target.dataset.color);

        //Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color );

        handelActive(e);

    });
});


//Switch Background Option
const spanOption = document.querySelectorAll(".random-background span");

//Loop in spans
spanOption.forEach((span) => {
    //Click On Evry span
    span.addEventListener('click',(s) => {

        handelActive(s);

        if (s.target.dataset.background === "yes") {
            backgroundOption = true;
            localStorage.setItem('backgroundOption',true);
            randomizeTmages();
        }else {
            backgroundOption = false;
            localStorage.setItem('backgroundOption',false);
            clearInterval(backgroundIntrval);
        }
    })
});

// Select landing Page 
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//Function To Randomize Images
function randomizeTmages() {

    if (backgroundOption === true){
        backgroundIntrval = setInterval( () => {

            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);

            //Change Background Image Url
            landingPage.style.backgroundImage = `url("imgs/` + imgArray[randomNumber] + `")`;
        }, 5000);
    };
};

randomizeTmages();

//select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //Window Height
    let windowHeight = this.innerHeight;

    //Windo Scroll Top 
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop +skillsOuterHeight - windowHeight)) {
        
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach((skill) => {

            skill.style.width = skill.dataset.progress;

        });

    }

};

//Creat Popup With The Image
let ourGallry = document.querySelectorAll(".gallary img");

ourGallry.forEach((img) => {
    img.addEventListener("click",(e) => {
        //Create Overlay Element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';

        //append overlay to the body
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");


        //add class to the popup box
        popupBox.className = 'popup-box';

        //create imge heading
        if (img.alt !== null) {
            //create heading
            let imageHeading = document.createElement('h3');

            //create text for heading
            let headingText = document.createTextNode(img.alt);

            //append text into heading
            imageHeading.appendChild(headingText); 

            //append heading to popup
            popupBox.appendChild(imageHeading);
        }

        //create the image
        let popupImage = document.createElement('img');

        //set image src
        popupImage.src = img.src;

        //set image into popup 
        popupBox.appendChild(popupImage);

        //append popup into body
        document.body.appendChild(popupBox);

        //create close span
        let closeSpan = document.createElement('span');

        //create the close button text
        let closeSpanText = document.createTextNode('X');

        //append text into close span
        closeSpan.appendChild(closeSpanText);

        //add class to close button
        closeSpan.className = 'close-button';

        //append close span into image popup
        popupBox.appendChild(closeSpan);

    });
});

//close popup 
document.addEventListener('click', (e) => {
    if (e.target.className === 'close-button') {

        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay 
        document.querySelector('.popup-overlay').remove();
    };
});

//Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All Links
const allLinks = document.querySelectorAll(".links a ");

function scrollToSomeWhere(element) {

    element.forEach((ele) => {
        ele.addEventListener('click',(e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
};

scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

//Handel Active State 
function handelActive(ev) {
    //Remove Active Class From All Childrens
    ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
        e.classList.remove("active");
    });

    //Add Active Calss On Self
    ev.target.classList.add("active");
    
};

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsConatiner = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });
    if(bulletLocalItem === 'show') {
        bulletsConatiner.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    }else {
        bulletsConatiner.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}

bulletsSpan.forEach(span => {
    span.addEventListener('click',(e) => {
        if (span.dataset.display === 'show') {

            bulletsConatiner.style.display = "block";
            localStorage.setItem('bullets_option','show');

        }else {

            bulletsConatiner.style.display = "none";
            localStorage.setItem('bullets_option','hide');

        }

        handelActive(e);

    })
});

//Rest Button

document.querySelector(".rest_options").onclick = function () {

    //Remove All Item From local Storage 
    localStorage.clear();

    //Reload Windo
    window.location.reload();
};


//Toggle Menue
let toggleBtn = document.querySelector(".toggle-menue");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //Stop Propagation
    e.stopPropagation();

    //Toggle Class "Menu-active" On Button
    this.classList.toggle("menu-active");

    //Toggle Class "Open" On Links
    tLinks.classList.toggle("open");

};
// Click Anywhere Outside Menue And Toggle Button
document.addEventListener('click', (e) => {
    if (e.target !== toggleBtn && e.target !== tLinks) {

        //Check If Menu is Open
        if (tLinks.classList.contains("open")) {

            //Toggle Class "Menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            //Toggle Class "Open" On Links
            tLinks.classList.toggle("open");
        }
    }
});

// //Stop Propagation On Menu
tLinks.onclick = function (e) {

    e.stopPropagation();

}