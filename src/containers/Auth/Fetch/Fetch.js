// import React, { Component } from 'react';

// class Fetch extends Component {
//     state = {
//         data: {},
//         isLoading: false
//     }

//     _fetch = async () => {
//         const res = await fetch(this.props.url);
//         const json = await res.json();

//         this.setState({
//             data: json,
//             isLoading: false
//         })
//     }

//     componentDidMount() {
//         this.setState({ isLoading: true }, this._fetch);
//     }

//     render() {
//         return(
//             <div></div>
//         );
//     }
// }

// export default Fetch;

// {
//     // {/*return this.props.render(this.state)*/ }
//     <Fetch url="https://api.github.com/users/imgly/repos" render={({ data, isLoading }) => (
//                 <div>
//                     <h2>img.ly repos</h2>
//                     {isLoading && <h2>Loading...</h2>}
//                     <ul>
//                         {data.length > 0 && data.map(repo => (
//                             <li key={repo.id}>
//                                 {repo.full_name}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )} />
// }