import React, {Component} from 'react';
import UserForm from '../containers/UserForm';
import UsersList from '../containers/UsersList';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usersList : [],
      newUser: {
        nickname: "",
        email: "",
        ip: ""
      },
      isEmpty: true,
      isSortedBy: "Sort by...",
      errors: {
        nickname: "",
        email: "",
        ip: ""
      },
      isSubmitDisabled: true,
    };
}

handleSubmit = (e) => {
  e.preventDefault();
  if (!this.state.isSubmitDisabled && this.state.newUser.nickname !== "" && this.state.newUser.email !== "" && this.state.newUser.ip !== "") {
    const { usersList } = this.state;
    usersList.push(this.state.newUser);
    this.setState({
      usersList,
     newUser : { nickname: "",
                email: "",
                ip: "",
                date: ""},
      isEmpty: false,
      isSubmitDisabled: true
      })
      if (this.state.isSortedBy) this.handleSortUsers(this.state.isSortedBy)
  }
}

handleInputChange = (e) => {
  const value = e.target.value;
  const name = e.target.name;
    this.setState({
      newUser : {
            ...this.state.newUser,
            [name]: value,
            date: new Date()
    },
    });
  this.validate(name, value);
}


validate = (name, value) => {
  let error = "error";
  let isSubmitDisabled = true;
  const {usersList} = this.state;
  const {errors} = this.state;
  switch(name) {
    case "nickname":
       error = value ? "" : "Nickname is required";
        if (usersList.length !== 0) {
          let isNewNickname = usersList.findIndex(user => user.nickname === value);
          if (isNewNickname !== -1) {
            error = "Nickname is already taken"
          }
        }
        break;
    case "email":
        let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
         error = emailValid ? "" : "Email is invalid";
        if (usersList.length !== 0) {
          let isNewEmail = usersList.findIndex(user => user.email === value);
          if (isNewEmail !== -1) {
            error = "User is already added"
          }
        }
      break;
    case 'ip':
        let ipValid = value.match(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);
        error= ipValid ? "" : "Wrong IP address format";
      break;
    default:
      break;
  }

  if (error !== "") {
  document.getElementById(name).classList.add("addForm__input--error");
  } else {
  document.getElementById(name).classList.remove("addForm__input--error");
  }
  
  const allErrors = Object.keys(this.state.errors).reduce((object, key) => {
    if (key !== name) {
      object[key] = this.state.errors[key]
    }
    return object
  }, {})

  if (error === "" && Object.values(allErrors)[0] === "" && Object.values(allErrors)[1] === "") {
     isSubmitDisabled = false
  } else {
    isSubmitDisabled = true
  }

  
  this.setState({errors: {
    ...errors,
    [name]: error
  },
isSubmitDisabled});
}

handleRemoveUser = (user) => {
  let removeConfirm = window.confirm(
    `Do you really want to remove ${user}?`
  );
  if (removeConfirm === true) {
    const users = this.state.usersList;
    const userIndex = users.findIndex(el => el.email === user );
    if ( userIndex !== -1) {
      users.splice(userIndex, 1);
      this.setState({
        usersList: users,
        isEmpty: !users.length });
    } else {
      alert("Something went wrong, please try again!")
    }
  }
}

handleRemoveAll = () => {
  let removeConfirm = window.confirm(
    "Do you really want to remove all users?"
  );
  if (removeConfirm === true) {
    const  usersList = [];
    this.setState({ usersList, isEmpty: true });
  }
}

sortBy = (property) => {
  return function (a,b) {
    let result;
    if (property === "date") {
       result = (a[property].getTime() < b[property].getTime()) ? -1 : (a[property].getTime() > b[property].getTime()) ? 1 : 0;
       result = result * -1;
    } else {
       result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
      return result;
  }
}

handleSortUsers = (e) => {
  const {usersList} = this.state;
  if (e.target) {
  usersList.sort(this.sortBy(e.target.value));
  this.setState({usersList, isSortedBy: e.target.value});
  } else {
    usersList.sort(this.sortBy(e))
  }
}



render() {
    return (
      <div>
      <UserForm 
      onSubmit={this.handleSubmit} 
      value={this.state.newUser}
      errors={this.state.errors} 
      onChange={this.handleInputChange} />
      <UsersList 
      users={this.state.usersList} 
      remove={this.handleRemoveUser} 
      removeAll={this.handleRemoveAll}
      isEmpty={this.state.isEmpty}
      sort={this.handleSortUsers}/>
      </div>
    )
  }
}

export default App;

