function fetchUser(){
  let searchUser = document.querySelector(".search-bar").value;

  axios.get(`https://api.github.com/users/${searchUser}`)
  .then(response => {
    user = response.data;
    
    fillData();
  })
  .catch(error => {
    alert(error);
  })
}

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

function fillData(){
  const {resultArea, intructions, avatar, name, bio, repos, followers} = constructor();

  resultArea.style.display = "flex";
  intructions.style.display = "none";
  name.innerHTML = user.name;
  bio.innerHTML = user.bio;
  avatar.setAttribute('src', user.avatar_url);
  repos.innerHTML = user.public_repos;
  followers.innerHTML = user.followers;
}




  