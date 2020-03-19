
var res=fetch('/api/events');
let pr= res.then((res)=>{
    if(res.status!=200){
        return;
    }
    return res.text();
})
pr.then((eventlist)=>{
    var events=JSON.parse(eventlist);
    console.log(events);
    var ul=document.getElementById("eventlist")
    for(var i=0;i<10;i++){
        var obj={0:events[i].name,2:events[i].organisation,3:events[i].text,4:events[i].venue,5:events[i].starttime+"-"+events[i].endtime}
        var li=document.createElement("li");
        li.classList.add("listyle")
        li.innerHTML=`<div class="card border-success mb-3" style="max-width: 18rem;">
        <div class="card-header bg-transparent border-success">${events[i].name}</div>
        <div class="card-body text-success">
          <h5 class="card-title">At ${events[i].venue}</h5>
          <h5 class="card-title">From ${events[i].starttime} to ${events[i].endtime} </h5>
          <p class="card-text">${events[i].text}</p>
        </div>
        <div class="card-footer bg-transparent border-success">- By ${events[i].organisation}</div>
      </div>`
        ul.append(li);
    }
});