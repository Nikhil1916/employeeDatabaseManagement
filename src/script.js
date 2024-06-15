// import JSON from "./data.json" assert { type: "json" };;

(async function() {
    const data = await fetch("./src/data.json");
    const employees = await data.json();
    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];
    const employeeList = document.querySelector(".employes-list-names");
    const employeeDetail = document.querySelector(".employee-info");
    console.log(employees);
    renderFnc();
    
    // event delegation via we get all users
    employeeList.addEventListener("click",(e)=>{
        if(e.target.tagName == 'SPAN' && selectedEmployeeId!=e.target.id) {
            selectedEmployeeId = e.target.id;
            renderFnc();
        }
    });
    function addEmployee() { }
    
    function selectEmplyee() { }

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
