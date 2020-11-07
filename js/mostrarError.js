const error = urlSearchParams.get('error');
console.log(error);
const errorEl = document.getElementById('error');
if( errorEl ){
    errorEl.innerHTML = error;
}