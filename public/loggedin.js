var submit=document.getElementById("subbut")
submit.addEventListener("click",()=>{
    var name=document.getElementsByName("name")[0].value
    var text=document.getElementsByName("text")[0].value
    var venue=document.getElementsByName("venue")[0].value
    var organisation=document.getElementsByName("organisation")[0].value
    var starttime=document.getElementsByName("starttime")[0].value
    var endtime=document.getElementsByName("endtime")[0].value
    var date=document.getElementsByName("date")[0].value
    var id=window.localStorage.getItem('id');
    var res=fetch(`/api/users/${id}/events`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({
            name,
            text,
            venue,
            organisation,
            starttime,
            endtime,
            date
        })
    });
    let pr= res.then((res)=>{
        if(res.status!=200){
            return;
        }
        return res.text();
    })
    pr.then((response)=>{
        var ress=JSON.parse(response);
        if(ress){
            var div=document.getElementById("disp")
            div.classList.remove("after-disp");
            div.classList.add("no-disp");
        }
    });
})

var addEvent=document.getElementById("addEvent")

addEvent.addEventListener("click",()=>{
    var div=document.getElementById("disp")
    div.classList.remove("no-disp");
    div.classList.add("after-disp");
})

var logout=document.getElementById("logout")

logout.addEventListener("click",()=>{
    window.localStorage.removeItem('id');
    window.location.replace("/");
})