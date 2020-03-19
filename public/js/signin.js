var submit=document.getElementById("subbut")
submit.addEventListener("click",()=>{
    var username=document.getElementsByName("username")[0].value
    var password=document.getElementsByName("password")[0].value
    var res=fetch('/api/auth/signin',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            username,
            password
        })
    });
    let pr= res.then((res)=>{
        if(res.status!=200){
            return;
        }
        return res.text();
    })
    pr.then((response)=>{
        var user=JSON.parse(response);
        localStorage.setItem("id",user.id)
        localStorage.setItem("user",user.username)
        localStorage.setItem("email",user.email)
        window.location.replace("/loggedin.html");
    });
})