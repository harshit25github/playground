/**
 * JS is single threaded 
 * ek kaam ek baar mein kar payegi 
 * at a time only one task will be performed
 * this synchronous programming
 * 
 * CallBacks  -> rk function which runs after some task is completed
 * Promises   -> to avoid callback hell
 * Async/Await -> to make async code look like sync code
 */


// Section 1 - Callbacks
// jhaa function call ho rha hai whaa function pass kar sktein hein and dusre side pey call bhi karna padegs 

function a(fn){
   fn(function(fn){
      fn(function(){})
   })
}

a(function(fn){
    fn(function (fn){
      fn()
    })
});