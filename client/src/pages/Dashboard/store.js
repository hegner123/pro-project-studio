deleteProject = (id) => {
  API.deleteProject(id)
  .then( res => this.loadProjects());
}

render() {
  const { user } = this.props.auth;

  return (
    <div className="container-fluid p-5 text-black">
      <div className="dashboard-bg">
      <div className="row">
        <div className=" col-6">
          <h1 className="text-white">{user.firstName.split(" ")[0]}</h1>
        </div>
        <div className="col-6 btn-align">
          <div className="cust-btn-group">
          <Addproject/>
          <AddSong id={this.state.idForContent}/>
          </div>
        </div>
        </div>

          <Tab.Container id="list-group-tabs-example" defaultActiveKey={this.state.idForContent}>
            <Row>
              <Col sm={2}>
                <ListGroup>
                  {this.state.projects.map(project => (
                    <OverlayTrigger placement="top" key={project.id} overlay={
                      <Popover id="popover-basic">
                        <Popover.Title as="h3">{project.title}</Popover.Title>
                        <Popover.Content>
                          <p>Client Name: {project.companyName}</p>
                          <p>Members: {project.members}</p>
                        </Popover.Content>
                      </Popover>} >
                      <ListGroup.Item action
                        href={" #" + project._id}
                        key={project._id}
                        onClick={()=> this.generateContent(project._id)}
                        >

                          <div className="row">
                            <div className="col-6">
                        {project.title}
                        </div>
                        <div className="col-6 btn-align">

                        <Dropdown bsPrefix={"myparentDropdown"}>
                          <Dropdown.Toggle bsPrefix={"myDropdown"} id="dropdown-basic">
                            ...
                          </Dropdown.Toggle>

                          <Dropdown.Menu>

                            <Dropdown.Item onClick={()=> this.editProject(project._id)}>Edit Project</Dropdown.Item>
                            <Dropdown.Item onClick={()=> this.deleteProject(project._id)}>Delete Project</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                        </div>
                        </div>
                      </ListGroup.Item>

                  </OverlayTrigger>
                  ))
                  }
                </ListGroup>

              </Col>

              <Col sm={8} className="contentSection">
                {/* <ContentPane
                  id={this.state.title}
                /> */}
                <div>
                  <ReactDataGrid
                    columns={this.state.columns}
                    rowGetter={i => this.state.rows[i]}
                    rowsCount={5}
                    onGridRowsUpdated={this.onGridRowsUpdated}
                    enableCellSelect={true}
                  />

                </div>

              </Col>
            </Row>
          </Tab.Container>
        </div>
        </div>


  );