
var res=fetch('/api/events');
let pr= res.then((res)=>{
    if(res.status!=200){
        return;
    }
    return res.text();
})
pr.then((eventlist)=>{
    var events=JSON.parse(eventlist);
    //console.log(events);
    var ul=document.getElementById("eventlist")
    var randomarr=["warning","success","primary","danger","info","secondary"];
    for(var i=0;i<events.length;i++){
        var li=document.createElement("li");
        randselect=randomarr[Math.floor(Math.random()*randomarr.length)]
        li.classList.add("listyle")
        li.innerHTML=`<div class="card border-${randselect} mb-3" style="max-width: 18rem;">
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
    }
});