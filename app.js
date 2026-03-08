let habits = JSON.parse(localStorage.getItem("habits")) || []

// Load habits
displayHabits()
updateProgress()

// Add habit
function addHabit(){
  let input = document.getElementById("habitInput")
  if(input.value === "") return

  habits.push({
    name: input.value,
    done:false,
    streak:0,
    lastCompleted: null
  })

  input.value=""
  saveHabits()
  displayHabits()
  updateProgress()
}

// Save to LocalStorage
function saveHabits(){
  localStorage.setItem("habits", JSON.stringify(habits))
}

// Display habits
function displayHabits(){
  let list = document.getElementById("habitList")
  list.innerHTML = ""

  habits.forEach((habit,index)=>{
    // Daily reset logic
    let today = new Date().toDateString()
    if(habit.lastCompleted !== today && habit.done){
      habit.done=false
      saveHabits()
    }

    let li = document.createElement("li")
    li.innerHTML=`
      <input type="checkbox" ${habit.done?"checked":""} onclick="toggleHabit(${index})">
      <span class="${habit.done?"completed":""}">${habit.name} (Streak: ${habit.streak})</span>
      <button class="delete" onclick="deleteHabit(${index})">X</button>
    `
    list.appendChild(li)
  })
}

// Toggle habit done
function toggleHabit(index){
  let habit = habits[index]
  habit.done = !habit.done

  // Update streak
  let today = new Date().toDateString()
  if(habit.done){
    if(habit.lastCompleted === new Date(Date.now()-86400000).toDateString()){
      habit.streak++
    }else if(habit.lastCompleted !== today){
      habit.streak=1
    }
    habit.lastCompleted = today
  }

  saveHabits()
  displayHabits()
  updateProgress()
}

// Delete habit
function deleteHabit(index){
  habits.splice(index,1)
  saveHabits()
  displayHabits()
  updateProgress()
}

// Delete all completed habits
function deleteCompleted(){
  habits = habits.filter(h => !h.done)
  saveHabits()
  displayHabits()
  updateProgress()
}

// Update progress bar
function updateProgress(){
  let total = habits.length
  let done = habits.filter(h=>h.done).length
  let percent = total===0?0:(done/total)*100
  document.getElementById("progressBar").style.width = percent+"%"
}

// Toggle Dark Mode
function toggleTheme(){
  document.body.classList.toggle("dark")
}