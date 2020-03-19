var submit=document.getElementById("subbut")
submit.addEventListener("click",()=>{
    var username=document.getElementsByName("username")[0].value
    var password=document.getElementsByName("password")[0].value
    var email=document.getElementsByName("email")[0].value
    var res=fetch('/api/auth/signup',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            email,
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
        if(response){
        document.getElementById("my-form").reset();
        var p=document.createElement("p");
        var text=document.createTextNode("Congratulations you have succesfully registered!")
        p.append(text);
        document.getElementById("success").append(p)
        setTimeout(() => {
            p.innerHTML=""
        }, 5000);
        }
    });
})