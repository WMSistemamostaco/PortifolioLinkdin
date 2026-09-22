particlesJS("particles-js", {

particles:{
number:{value:90},
color:{value:"#3B82F6"},
shape:{type:"circle"},
opacity:{value:0.5},
size:{value:3},
move:{enable:true,speed:2}
},

interactivity:{
events:{
onhover:{enable:true,mode:"grab"},
onclick:{enable:true,mode:"push"}
},

modes:{
grab:{distance:150,line_linked:{opacity:.4}},
push:{particles_nb:4}
}
}

});

const header=document.querySelector("header");

window.addEventListener("scroll",()=>{
if(window.scrollY>60){
header.style.background="rgba(2,6,23,.95)";
}else{
header.style.background="rgba(3,7,18,.65)";
}
});
