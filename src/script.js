// import JSON from "./data.json" assert { type: "json" };;

(async function() {
    const data = await fetch("./src/data.json");
    let employees = await data.json();
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
    const employeeList = document.querySelector(".employes-list-names");
    const employeeDetail = document.querySelector(".employee-info");
    const addEmployeeBtn = document.querySelector(".create-employee");
    const createEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");
    console.log(employees);
    renderFnc();
    
    // event delegation via we get all users
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName == 'SPAN' && selectedEmployeeId!=e.target.id) {
            selectedEmployeeId = e.target.id;
            renderFnc();
        }
        if(e.target.tagName == 'I') {
            if(employees.length == 1) {
                alert("One Employee is mandatory");
                return;
            }
            employees = employees?.filter((emp)=>emp.id!=e.target.parentNode.id);
            if(e.target.parentNode.id == selectedEmployeeId) {
                selectedEmployee = employees[0];
                selectedEmployeeId = employees[0].id ;
            }
            renderFnc();
        }
    });

    addEmployeeBtn.addEventListener("click",()=>{
        createEmployeeModal.style.display = "flex";
    });

    createEmployeeModal.addEventListener("click",(e)=>{
        // console.log(e.target);
        if(e.target.className==="addEmployee") {
            createEmployeeModal.style.display = "none";
        }
    });

    addEmployeeForm.addEventListener("submit",(e)=>{
        e.preventDefault();
        // console.log(e.target);
        const formData = new FormData(addEmployeeForm);
        const values  = [...formData.entries()];
        // console.log(values);
        let empData = {};
        values?.forEach((val)=>{
            empData[val[0]] = val[1];
        });
        empData.id = employees[employees.length - 1].id + 1;
        empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
        employees.push(empData);
        // console.log(empData);
        renderFnc();
        addEmployeeForm.reset();
        createEmployeeModal.style.display = "none";
    })

    function renderEmployeeDetail() {
        employeeDetail.innerHTML = `<img width="200" height="200" src="${selectedEmployee?.imageUrl}" />
        <span class="employee-name">${selectedEmployee?.firstName} ${selectedEmployee?.lastName}</span>
        <span>${selectedEmployee?.address}</span>
        <span>${selectedEmployee?.email}</span>
        <span>DOB- ${selectedEmployee?.dob}</span>
        <span>Mobile No. ${selectedEmployee?.contactNumber}</span>
        `
    }

    function renderFnc() {
        employeeList.innerHTML = "";
        employees?.forEach((employeeD)=>{
            const employee = document.createElement("span");
            employee.classList.add("employee-name-item");
            if(parseInt(employeeD.id)==selectedEmployeeId) {
                employee.classList.add("selected")
                selectedEmployee = employeeD;
                selectedEmployeeId = employeeD.id;
                renderEmployeeDetail();
            }
            employee.setAttribute("id",employeeD?.id);
            employee.innerHTML = `${employeeD?.firstName} ${employeeD?.lastName}<i class="delete">X</i>`;
            employeeList.appendChild(employee);
        });
    }
})();
