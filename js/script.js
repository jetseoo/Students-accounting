document.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div')
  container.classList.add('container')
  document.body.style.backgroundColor = '#f5f5f5'
  document.body.append(container)
  const students = [
    {
      name: 'John',
      surname: 'Doe',
      patronymic: 'Smith',
      birthday: new Date(1996, 1, 3),
      studyYear: 2020,
      faculty: 'Faculty of law'
    },
    {
      name: 'Neville',
      surname: 'Longbottom',
      patronymic: 'Frank',
      birthday: new Date(1980, 6, 30),
      studyYear: 2001,
      faculty: 'Gryffindor'
    },
    {
      name: 'Donald',
      surname: 'Trump',
      patronymic: 'John',
      birthday: new Date(1946, 5, 14),
      studyYear: 2009,
      faculty: 'Economics'
    },
    {
      name: 'Peter',
      surname: 'Parker',
      patronymic: 'Spider',
      birthday: new Date(1979, 4, 1),
      studyYear: 2021,
      faculty: 'Web'
    },
    {
      name: 'Ragnar',
      surname: 'Lodgbock',
      patronymic: 'Viking',
      birthday: new Date(1978, 4, 11),
      studyYear: 2019,
      faculty: 'The law of war'
    },
    {
      name: 'Abrene',
      surname: 'Lodge',
      patronymic: 'Kyle',
      birthday: new Date(1988, 2, 13),
      studyYear: 2012,
      faculty: 'Technologies'
    },
    {
      name: 'Bruh',
      surname: 'Chill',
      patronymic: 'Mann',
      birthday: new Date(1985, 1, 19),
      studyYear: 2021,
      faculty: 'Flex'
    },
    {
      name: 'Carl',
      surname: 'Junior',
      patronymic: 'Gangsta',
      birthday: new Date(1970, 8, 25),
      studyYear: 2000,
      faculty: 'Grove st. protection'
    },
    {
      name: 'Drake',
      surname: 'God',
      patronymic: 'Cringe',
      birthday: new Date(1978, 4, 11),
      studyYear: 2004,
      faculty: 'Stuff'
    },
  ]
  let filteredStudents = []
  let appliedFilters = []

  function createForm() {
    const openFormBtn = document.createElement('button')
    openFormBtn.classList.add('btn', 'btn-outline-secondary')
    openFormBtn.type = 'button'
    openFormBtn.setAttribute('data-bs-toggle', 'collapse')
    openFormBtn.setAttribute('data-bs-target', '#fieldset')
    openFormBtn.textContent = 'Add new student'

    openFormBtn.addEventListener('click', () => {
      fieldset.classList.toggle('d-flex')
    })

    const form = document.createElement('form')
    form.classList.add('mt-5')

    const fieldset = document.createElement('fieldset')
    fieldset.id = 'fieldset'
    fieldset.classList.add('flex-column', 'flex-wrap', 'justify-content-between', 'mb-3', 'mt-3', 'collapse')
    fieldset.style.maxHeight = '200px'

    const input = (value) => {
      const wrapper = document.createElement('div')
      wrapper.classList.add('form-floating', 'd-inline-block', 'w-50')

      const inputEl = value === 'Faculty' ?
      document.createElement('textarea') : document.createElement('input')

      inputEl.classList.add('form-control')
      const inputId = value.split(' ').shift()
      inputEl.setAttribute('id', inputId)
      inputEl.setAttribute('required', 'true')
      inputEl.placeholder = value

      switch (value) {
        case 'Birthday':
          inputEl.type = 'date'
          inputEl.setAttribute('min', '1900-01-01')
          inputEl.max = new Date().toISOString().split("T")[0]
          break
        case 'Year of study start':
          inputEl.type = 'number'
          inputEl.setAttribute('min', '2000')
          inputEl.max = new Date().toISOString().split("T")[0].split('-')[0]
          break
        case 'Faculty':
          inputEl.style.resize = 'none'
          break
        default:
          inputEl.type = 'text'
          break
      }

      const label = document.createElement('label')
      label.textContent = value
      label.setAttribute('for', inputId)

      wrapper.append(inputEl)
      wrapper.append(label)
      return wrapper
    }

    const addStudentBtn = document.createElement('button')
    addStudentBtn.classList.add('btn', 'btn-outline-primary')
    addStudentBtn.style.height = '29%'
    addStudentBtn.setAttribute('type', 'submit')
    addStudentBtn.textContent = 'Add student'

    fieldset.append(input('Name'))
    fieldset.append(input('Surname'))
    fieldset.append(input('Patronymic or middle name'))
    const dateInputsWrapper = document.createElement('div')
    dateInputsWrapper.classList.add('d-flex')
    dateInputsWrapper.append(input('Birthday'))
    dateInputsWrapper.append(input('Year of study start'))
    fieldset.append(dateInputsWrapper)
    fieldset.append(input('Faculty'))
    fieldset.append(addStudentBtn)


    const btnsWrapper = document.createElement('div')
    btnsWrapper.classList.add('mb-4', 'mt-3')
    btnsWrapper.id = 'btnsWrapper'


    const cancelSortBtn = document.createElement('button')
    cancelSortBtn.classList.add('btn', 'btn-outline-secondary', 'd-none', 'me-2')
    cancelSortBtn.id = 'cancel-sort-btn'
    cancelSortBtn.textContent = 'Cancel sorting'

    cancelSortBtn.addEventListener('click', (e) => {
      e.preventDefault()
      clearTable()
      addStudentsToTable(students)
      cancelSortBtn.classList.add('d-none')
    })

    const openFilterFormBtn = document.createElement('button')
    openFilterFormBtn.classList.add('btn', 'btn-outline-secondary', 'me-3')
    openFilterFormBtn.type = 'button'
    openFilterFormBtn.id = 'openFilterFormBtn'
    openFilterFormBtn.setAttribute('data-bs-toggle', 'collapse')
    openFilterFormBtn.setAttribute('data-bs-target', '#filterWrapper')
    openFilterFormBtn.setAttribute('aria-expanded', 'false')
    openFilterFormBtn.setAttribute('aria-controls', 'filterWrapper')
    openFilterFormBtn.textContent = 'Filter'

    const appliedFiltersListWrapper = document.createElement('div')
    appliedFiltersListWrapper.classList.add('d-inline-block')
    appliedFiltersListWrapper.id = 'appliedFiltersListWrapper'

    const filterWrapper = document.createElement('div')
    filterWrapper.classList.add('collapse', 'mt-3')
    filterWrapper.id = 'filterWrapper'

    btnsWrapper.append(cancelSortBtn)
    btnsWrapper.append(openFilterFormBtn)
    btnsWrapper.append(appliedFiltersListWrapper)
    btnsWrapper.append(document.createElement('div'))


    function createFilterInput() {
      const filterCategories = ['Name', 'Faculty', 'Birthday', 'Graduation year']

      const input = (value) => {
        const wrapper = document.createElement('div')
        wrapper.classList.add('form-floating', 'd-inline-block', 'align-middle', 'w-25')

        const input = document.createElement('input')
        input.classList.add('form-control')
        const inputId = value.split(' ').shift()
        input.setAttribute('id', inputId)

        switch (value) {
          case 'Birthday':
            input.type = 'date'
            break;
        case 'Graduation year':
            input.type = 'number'
            input.min = 2004
            break;
          default:
            input.type = 'text'
            break;
        }

        const label = document.createElement('label')
        label.textContent = value
        label.setAttribute('for', inputId)

        wrapper.append(input)
        wrapper.append(label)
        return wrapper
      }

      for (let category of filterCategories) {
        filterWrapper.append(input(category))
      }

      const addFilterBtn = document.createElement('button')
      addFilterBtn.classList.add('btn', 'btn-secondary', 'mt-2')
      addFilterBtn.setAttribute('type', 'button')
      addFilterBtn.innerText = 'Apply'
      filterWrapper.append(addFilterBtn)

      addFilterBtn.onclick = filter

      btnsWrapper.append(filterWrapper)
    }
    createFilterInput()

    openFilterFormBtn.addEventListener('click', (e) => {
      e.preventDefault()
      filterWrapper.classList.toggle('opened')

      filterWrapper.classList.contains('opened') ?
      openFilterFormBtn.textContent = 'Cancel filter' :
      openFilterFormBtn.textContent = 'Filter'

      if (openFilterFormBtn.textContent === 'Filter') {
        openFilterFormBtn.onclick = cancelFilter()
      }
    })

    form.append(openFormBtn)
    form.append(fieldset)
    container.append(form)
    form.after(btnsWrapper)
  }
  createForm()

  function createTable() {
    const table = document.createElement('table')
    table.classList.add('table', 'table-striped', 'table-hover')

    const thead = document.createElement('thead')
    const tr = document.createElement('tr')

    const nameCol = document.createElement('th')
    nameCol.setAttribute('scope', 'col')
    nameCol.textContent = 'Student'
    nameCol.id = 'studentNameCol'
    tr.append(nameCol)

    const facultyCol = document.createElement('th')
    facultyCol.setAttribute('scope', 'col')
    facultyCol.textContent = 'Faculty'
    facultyCol.id = 'facultyCol'
    tr.append(facultyCol)

    const birthCol = document.createElement('th')
    birthCol.setAttribute('scope', 'col')
    birthCol.textContent = 'Date of birth'
    birthCol.id = 'birthCol'
    tr.append(birthCol)

    const studyYearsCol = document.createElement('th')
    studyYearsCol.setAttribute('scope', 'col')
    studyYearsCol.textContent = 'Study years'
    studyYearsCol.id = 'studyYearCol'
    tr.append(studyYearsCol)

    const tbody = document.createElement('tbody')

    thead.append(tr)
    table.append(thead)
    table.append(tbody)
    container.append(table)
  }
  createTable()

  function clearTable() {
    const elem = document.getElementsByTagName('tbody')[0]
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild)
    }
  }

  function clearForm() {
    const input = document.getElementsByClassName('form-control')
    if (input) {
      for (let i = 0; i < input.length; ++i) {
        input[i].value = ''
      }
    }

    const filterWrapper = document.getElementById('filterWrapper')
    filterWrapper.childNodes[1].value = ''
  }

  function getAge(date) {
    let now = new Date()
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    let birthday = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    let dobThisYear = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate())
    let age

    age = today.getFullYear() - birthday.getFullYear()
    if (today < dobThisYear) age = age - 1
    return age
  }

  function addStudentsToTable(arr) {
    for (let student of arr) {
      let tbody = document.getElementsByTagName('tbody')[0]
      let tr = document.createElement('tr')

      let fullName = document.createElement('td')
      fullName.textContent = student.name + ' ' + student.surname + ' ' + student.patronymic
      tr.append(fullName)

      let faculty = document.createElement('td')
      faculty.textContent = student.faculty
      tr.append(faculty)

      let birth = document.createElement('td')
      birth.setAttribute('data-birthDay', `${student.birthday}`)
      const birthdayYear = student.birthday.getFullYear()
      const birthdayMonth = student.birthday.getMonth()
      const monthTwoDigit = birthdayMonth <= 9 ? '0' + (birthdayMonth + 1) : birthdayMonth + 1
      const birthdayDate = student.birthday.getDate()
      const birthdayTwoDigit = birthdayDate <= 9 ? '0' + birthdayDate : birthdayDate

      const age = getAge(student.birthday)
      birth.textContent = `${birthdayTwoDigit}.${monthTwoDigit}.${birthdayYear} (${age})`
      tr.append(birth)

      let studyYears = document.createElement('td')
      const today = new Date()
      const studyFinish = new Date(student.studyYear + 4, 8)

      studyYears.textContent = student.studyYear + ' - ' + (student.studyYear + 4)

      if (studyFinish.getTime() < today.getTime() ) {
        studyYears.textContent += ''
      } else {
        switch (studyFinish.getFullYear() - today.getFullYear()) {
          case 0:
            studyYears.textContent += ' (year 4)'
            break;
          case 1:
            studyYears.textContent += ' (year 3)'
            break;
          case 2:
            studyYears.textContent += ' (year 2)'
            break;
          case 3:
            studyYears.textContent += ' (year 1)'
            break;
          default:
            studyYears.textContent += ''
            break;
        }
      }
      tr.append(studyYears)

      tbody.prepend(tr)
    }
  }
  addStudentsToTable(students)

  function sort() {
    const nameCol = document.getElementById('studentNameCol')
    const facultyCol = document.getElementById('facultyCol')
    const birthCol = document.getElementById('birthCol')
    const studyYearCol = document.getElementById('studyYearCol')

    const sortBtns = [nameCol, facultyCol, birthCol, studyYearCol]
    sortBtns.forEach(function(btn){
      btn.style.cursor = 'pointer'
      btn.style.after = 'hi'
      btn.addEventListener('click', function(){
        let columnNumber
        switch (btn.textContent) {
          case 'Student':
            columnNumber = 0
            break;
          case 'Faculty':
            columnNumber = 1
            break;
          case 'Date of birth':
            columnNumber = 2
            break;
          case 'Study years':
            columnNumber = 3
            break;
          default:
            columnNumber = 0
            break;
        }
        const table = document.getElementsByTagName('tbody')[0]
        let sortedRows

        if (columnNumber == 2) {
          sortedRows = Array.from(table.childNodes).sort((rowA, rowB) =>
          new Date(rowA.cells[columnNumber].attributes['data-birthday'].textContent) <
          new Date(rowB.cells[columnNumber].attributes['data-birthday'].textContent) ? 1 : -1);
        } else if (columnNumber == 3) {
          sortedRows = Array.from(table.childNodes).sort((rowA, rowB) =>
          rowA.cells[columnNumber].innerHTML < rowB.cells[columnNumber].innerHTML ? 1 : -1);
        } else {
          sortedRows = Array.from(table.childNodes).sort((rowA, rowB) =>
          rowA.cells[columnNumber].innerHTML.toLowerCase() >
          rowB.cells[columnNumber].innerHTML.toLowerCase() ? 1 : -1);
        }
        clearTable()
        table.append(...sortedRows);

        const cancelSortBtn = document.getElementById('cancel-sort-btn')
        cancelSortBtn.classList.remove('d-none')
      })
    })
  }
  sort()

  const form = document.querySelector('form')
  form.addEventListener('submit', function createStudent(e) {
    e.preventDefault()
    const student = {}

    student.name = document.getElementById('Name').value.trim()
    student.surname = document.getElementById('Surname').value.trim()
    student.patronymic = document.getElementById('Patronymic').value.trim()

    const birthdayValue = document.getElementById('Birthday').value.trim()
    student.birthday = new Date(birthdayValue)

    const studyYearValue = document.getElementById('Year').value.trim()
    student.studyYear = new Date(studyYearValue).getFullYear()

    student.faculty = document.getElementById('Faculty').value.trim()
    students.push(student)

    clearForm()
    clearTable()
    addStudentsToTable(students)
    return student.birthday
  })

  function cancelFilter() {
    appliedFilters.forEach((filter) => {
      filter.value = ''
    })

    const filtersWrapper = document.getElementById('appliedFiltersListWrapper')

    while(filtersWrapper.firstChild) {
      filtersWrapper.removeChild(filtersWrapper.firstChild)
    }
    clearTable();
    addStudentsToTable(students);
  }

  function filter() {
    let filteredStudentsArr

    for (let index = 0; index <= 3; index++) {
      let value = this.parentNode.childNodes[index].childNodes[0].value
      let category = this.parentNode.childNodes[index].childNodes[1].innerText

      if (value !== '') appliedFilters[index] = {category: category, value: value}
    }

    if (!appliedFilters.length > 0) return

    if (!filteredStudents.length > 0) {
      filteredStudents = [...students]
    }

    function doFilter(category, inputValue, arr) {
      let result
      switch (category) {
        case 'Name':
          result = arr.filter(student => {
            return student.name.toLowerCase().includes(inputValue) ||
              student.surname.toLowerCase().includes(inputValue) ||
              student.patronymic.toLowerCase().includes(inputValue)
          })
          break

        case 'Faculty':
          result = arr.filter(student => {
            return student.faculty.toLowerCase().includes(inputValue)
          })
          break

        case 'Birthday':
          result = arr.filter(student => {
            inputDate = new Date(inputValue)
            return (student.birthday).toLocaleDateString() === inputDate.toLocaleDateString()
          })
          break

        case 'Graduation year':
          result = arr.filter(student => {
            return (student.studyYear + 4) === +inputValue
          })
          break

        default:
          alert('Invalid filter', category, inputValue)
          break
      }
      return result
    }

    while (appliedFiltersListWrapper.firstChild) {
      appliedFiltersListWrapper.removeChild(appliedFiltersListWrapper.firstChild)
    }

    appliedFilters.forEach(filter => {
      const inputValue = filter.value.toLowerCase().trim()
      if (inputValue == '') return

      filteredStudentsArr = doFilter(filter.category, inputValue, filteredStudentsArr ?? filteredStudents)

      const filterBadge = () => {
        const badge = document.createElement('div')
        badge.classList.add('btn', 'btn-outline-warning', 'me-2')
        badge.style.cursor = 'default'
        badge.textContent = `${filter.category} : ${filter.value}`
        return badge
      }
      appliedFiltersListWrapper.append(filterBadge())
    })

    clearForm()
    clearTable()
    addStudentsToTable(filteredStudentsArr)
  }
})
