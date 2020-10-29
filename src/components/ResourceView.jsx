import React, { Component } from "react";
import { connect } from "react-redux";
import { loadResources } from "../store/resources";
import * as viewTypes from "../viewTypes";
import ResourceList from "./ResourceList";

// const ResourceView = () => {
//   const [data, setData] = useState([]);

//   const dispatch = useDispatch();
//   const resources = useSelector((state) => state.entities.resources.list);

//   useEffect(() => {
//     dispatch(loadResources());

//     //get from store instead
//     if (localStorage.getItem("List")) {
//       console.log(localStorage.getItem("List"));
//       setData(JSON.parse(localStorage.getItem("List")));
//     } else {
//       setData([
//         {
//           title: "Variables",
//           items: [
//             <ResourceList resources={resources} view={viewTypes.powerFlowkW} />,
//             <ResourceList resources={resources} view={viewTypes.powerFlowkW} />,
//           ],
//         },
//       ]);
//     }
//   }, [dispatch, resources]);

//   return (
//     <div className='container-fluid'>
//       <DragNDrop data={data} />
//     </div>
//   );
// };

// export default ResourceView;

class ResourceView extends Component {
  componentDidMount() {
    this.props.loadResources();
    this.interval = setInterval(() => this.props.loadResources(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    console.log(this.props.resources);
    return (
      <div className='container-fluid'>
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.powerFlowkW}
        />
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.powerFlowPercent}
        />
        {/* <ResourceList
          resources={this.props.resources}
          view={viewTypes.status}
        />
        <ResourceList resources={this.props.resources} view={viewTypes.soc} />
        <ResourceList
          resources={this.props.resources}
          view={viewTypes.temperature}
        /> */}
      </div>
    );
  }
}

// state is state of the store
// returning an object
const mapStateToProps = (state) => ({
  resources: state.entities.resources.list,
});

const mapDispatchToProps = (dispatch) => ({
  loadResources: () => dispatch(loadResources()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceView);
