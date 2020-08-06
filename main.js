function fetchGithubUser(userName){
  handleLoader(true);

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Convert response to JSON
      const user = JSON.parse(this.responseText);
      
      handleLoader(false);
      fillUser(user);
    }

    if(this.status !== 200){
      const error = JSON.parse(this.responseText);

      fillError(error);
      handleLoader(false);
    }
  };
  xhttp.open("GET", `https://api.github.com/users/${userName}`, true);
  xhttp.send();
}

// This function return true if a string has at least one character
// If string just have white spaces will return as a empty string
function isStringEmpty(string) {
  if (/\S/.test(string)) return false;

  return true;
};


document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  let searchUser = document.querySelector(".search-bar");
  
  if(!isStringEmpty(String(searchUser.value))) {
    searchUser.classList.remove('error');
    fetchGithubUser(searchUser.value);
  }else{
    searchUser.classList.add('error');
    searchUser.placeholder = "Nome de usuário inválido";
  } 
})

function constructor(){
  let resultArea = document.querySelector('.result-area');
  let intructions = document.querySelector('.intructions');
  let name = document.querySelector('.name');
  let bio = document.querySelector('.bio');
  let avatar = document.querySelector('.avatar');
  let repos = document.querySelector('.repos');
  let followers = document.querySelector('.followers');
  
  return {resultArea, intructions, name, avatar, bio, repos, followers}
}

function handleLoader(visibility){
  let loader = document.querySelector('.loader-content');
  let intructions = document.querySelector('.intructions');
  let resultArea = document.querySelector('.result-area');

  if(visibility){
    loader.style.display = "flex";
    intructions.style.display = "none";
    resultArea.style.display = "none";
  }else{
    loader.style.display = "none";
    intructions.style.display = "flex";
    resultArea.style.display = "none";
  }
}

function fillError(error){
  const toastError = document.querySelector('.api-error-message');

  toastError.innerHTML = error.message;
  toastError.style.opacity = 1;

  setTimeout(() => {
    toastError.style.opacity = 0;
  }, 5000);
}

function fillUser(user){
  const {resultArea, intructions, avatar, name, bio, repos, followers} = constructor();

  resultArea.style.display = "flex";
  intructions.style.display = "none";
  name.innerHTML = user.name;
  bio.innerHTML = user.bio;
  avatar.setAttribute('src', user.avatar_url);
  repos.innerHTML = user.public_repos;
  followers.innerHTML = user.followers;
}




  