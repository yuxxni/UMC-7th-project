const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');


todoInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      addInput();
    } 
  })     
      
    
      function addInput() {
        if(todoInput.value !== " ") {
           const newLi = document.createElement('li');
           const completeButton = document.createElement('button');
      
           newLi.textContent = todoInput.value;

           completeButton.textContent = '완료';
           newLi.appendChild(completeButton);

           todoList.appendChild( newLi);

           todoInput.value = " ";

           completeButton.addEventListener('click', function() {
            completeInput(newLi);
           })
          }
        }
        
        
        function completeInput(listItem){
          todoList.removeChild(listItem);
          listItem.removeChild(listItem.querySelector('button'))

          const deleteButton = document.createElement('button');
          deleteButton.textContent = '삭제';

          deleteButton.addEventListener('click', function() {
            doneList.removeChild(listItem);
          });

          listItem.appendChild(deleteButton);
          doneList.appendChild(listItem);
          
    }



