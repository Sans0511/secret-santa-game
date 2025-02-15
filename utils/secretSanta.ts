import { Santa } from "@/utils/validation";

export const generateSecretSanta = (employees: Santa[]): Santa[] => {
  // Create a copy of the employee list for assignment
  let availableChildren = [...employees];

  // Generate the Secret Santa assignments
  let newAssignments: Santa[] = employees.map((employee) => {
    let possibleChildren = availableChildren.filter(
      (child) => employee.Employee_EmailID !== child.Employee_EmailID // Check if it's not the same email
    );

    if (possibleChildren.length === 0) {
      console.log("No valid assignments found for:", employee.Employee_Name);
      return employee;
    }

    // Randomly select a valid child
    let selectedChild =
      possibleChildren[Math.floor(Math.random() * possibleChildren.length)];
    availableChildren = availableChildren.filter(
      (child) => child.Employee_EmailID !== selectedChild.Employee_EmailID
    );

    // Return the employee with their assigned child
    return {
      ...employee,
      Secret_Child_Name: selectedChild.Employee_Name,
      Secret_Child_EmailID: selectedChild.Employee_EmailID,
    };
  });

  return newAssignments;
};
