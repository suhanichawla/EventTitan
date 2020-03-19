

fetchEvents();

function fetchEvents(){
    var id=window.localStorage.getItem('id');
    var res=fetch(`/api/users/${id}/events`);
    let pr= res.then((res)=>{
        if(res.status!=200){
            return;
        }
        return res.text();
    })
    pr.then((response)=>{
        var events=JSON.parse(response);
        if(!(events==0)){
            var ul=document.getElementById("eventlist")
            ul.innerHTML="";
            var randomarr=["warning","success","primary","danger","info","secondary"];
            for(var i=events.length-1;i>=0;i--){
                var li=document.createElement("li");
                randselect=randomarr[Math.floor(Math.random()*randomarr.length)]
                li.classList.add("listyle")
                li.innerHTML=`<div class="card border-${randselect} mb-3" style="max-width: 18rem;">
                <p data-myuniqueid=${events[i]._id} id="but${i}" class="closed closeit">X</p>
                <div class="card-header bg-transparent border-${randselect}">${events[i].name}</div>
                <div class="card-body text-${randselect}">
                <h5 class="card-title">At ${events[i].venue}</h5>
                <h5 class="card-title">On ${events[i].date.slice(0,10)}</h5>
                <h5 class="card-title">From ${events[i].starttime} to ${events[i].endtime} </h5>
                <p class="card-text">${events[i].text}</p>
                </div>
                <div class="card-footer bg-transparent border-${randselect}">- By ${events[i].organisation}</div>
            </div>`
                ul.append(li);
                var button=document.getElementById("but"+i);
                button.addEventListener("click",()=>{
                    var id=window.localStorage.getItem('id');
                    var eventid=button.dataset.myuniqueid
                    console.log(eventid)
                    var res=fetch(`/api/users/${id}/events/${eventid}`,{
                        method:"DELETE",
                    });
                    let pr= res.then((res)=>{
                        if(res.status!=200){
                            return;
                        }
                        return res.text();
                    })
                    pr.then((response)=>{
                        console.log(response)
                        var ress=JSON.parse(response);
                        if(ress){
                            var div=document.getElementById("disp")
                            div.classList.remove("after-disp");
                            div.classList.add("no-disp");
                            fetchEvents()
                        }
                    });
                })
            }
        }else{
            var ul=document.getElementById("eventlist");
            ul.innerHTML="";
            var li=document.createElement("li");
            li.classList.add("listyle")
            var text=document.createTextNode("Events added by you will display here.")
            li.append(text);
            ul.append(li)

        }
    });
}

var userinfo=document.getElementById("userinfo")
var email=localStorage.getItem("email")
var username=localStorage.getItem("user")
userinfo.innerHTML=`<hr>
<p>Username: <br>
@${username}</p>
<hr>
<p id="flexed">Email: <br> ${email}</p>`

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
            document.getElementById("my-form").reset();
            var div=document.getElementById("disp")
            div.classList.remove("after-disp");
            div.classList.add("no-disp");
            fetchEvents()
        }
    });
})

var addEvent=document.getElementById("addEvent")

addEvent.addEventListener("click",()=>{
    var div=document.getElementById("disp")
    div.classList.remove("no-disp");
    div.classList.add("after-disp");
})

var close=document.getElementById("close")

close.addEventListener("click",()=>{
    var div=document.getElementById("disp")
    div.classList.remove("after-disp");
    div.classList.add("no-disp");
})



var logout=document.getElementById("logout")

logout.addEventListener("click",()=>{
    window.localStorage.removeItem('id');
    window.location.replace("/");
})

