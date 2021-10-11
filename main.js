document.querySelector('input').addEventListener('change', checkString)

function checkString() {
    let string = document.querySelector('input').value

    fetch(`/api?string=${string}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data.result)
            if (data.result === false) {
                document.querySelector('.answer').innerText = 'Not a palindrome'
            }
            else {
                document.querySelector('.answer').innerText = 'Yep, its a palindrome'
            }
        })
        .catch(err => console.log(err)
        )}
