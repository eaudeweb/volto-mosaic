import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { tiles } from '~/config';
import { Tab, Button, Modal, Icon, Grid } from 'semantic-ui-react';

import SelectTileType from './SelectTileType';
// import TileDataEditor from './TileDataEditor';
import TileMetadataEditor from './TileMetadataEditor';

class ModalEditor extends Component {
  constructor(props) {
    super(props);

    const tile = props.formData['tiles'][props.tileid];
    this.state = {
      // tiles: props.tiles,
      tileid: props.tileid,
      formData: props.formData,
      tileData: tile,
      useRecommendedHeight: false,
    };

    this.tileRef = React.createRef();

    this.renderEditTile = this.renderEditTile.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);

    // this is ugly, should reduce number of similar methods
    this.onChangeTile = this.onChangeTile.bind(this);
    this.onMutateTile = this.onMutateTile.bind(this);
    this.handleMetadataChange = this.handleMetadataChange.bind(this);

    this.panes = [];
  }

  renderEditTile() {
    // const { formData } = this.state; // destructuring
    // const tilesFieldname = getTilesFieldname(formData);
    // const tilesDict = formData[tilesFieldname];

    let Tile = null;
    let type = this.state.tileData['@type'].toLowerCase();
    Tile = tiles.tilesConfig[type].edit;

    let nop = () => {};

    return (
      <Tile
        id={this.state.tileid}
        tile={this.state.tileid}
        data={this.state.tileData}
        properties={this.state.formData}
        onAddTile={nop}
        onChangeTile={this.onChangeTile}
        onMutateTile={nop}
        onChangeField={nop}
        onDeleteTile={nop}
        onSelectTile={nop}
        handleKeyDown={nop}
        pathname={this.props.pathname}
        onMoveTile={nop}
        onFocusPreviousTile={nop}
        onFocusNextTile={nop}
        selected={true}
        index={0}
        ref={this.tileRef}
      />
    );
  }

  onChangeTile(id, value) {
    // handles editing inside the actual tile editor
    console.log('Changing tile', value);
    this.setState({
      tileData: { ...value },
    });
  }

  onSave() {
    // const node = ReactDOM.findDOMNode(this);
    //
    // console.log('height', this.tileRef.current.height);
    // console.log('brect', .getBoundingClientRect());
    if (!this.state.useRecommendedHeight) {
      this.props.onClose(this.state.tileData);
      return;
    }
    let type = this.state.tileData['@type'].toLowerCase();
    const minHeight = tiles.tilesConfig[type].height;

    const node = ReactDOM.findDOMNode(this.tileRef.current);
    let size = {
      height: minHeight,
      width: node.offsetWidth,
    };
    this.props.onClose(this.state.tileData, size);
  }

  onCancel() {
    this.props.onClose();
  }

  onMutateTile(type) {
    // handles changing the tile type. Needed by the <Tile> component?
    console.log('Mutating tile type', type);
    this.setState({
      tileData: {
        ...this.state.tileData,
        '@type': type,
      },
    });
  }

  handleMetadataChange(values) {
    // handles changes coming from the metadata editor

    let tileData = this.state.tileData;
    this.setState(
      {
        tileData: {
          ...tileData,
          ...values,
        },
      },
      () => {
        console.log('State after handleMetadataChange', this.state);
      },
    );
  }

  render() {
    return (
      <Modal closeIcon open={true}>
        {/* <Modal.Header> */}
        {/* </Modal.Header> */}
        <Modal.Content>
          <Tab
            menu={{ fluid: true, tabular: 'top' }}
            panes={[
              {
                menuItem: 'Data',
                render: () => <Tab.Pane>{this.renderEditTile()}</Tab.Pane>,
              },
              {
                menuItem: 'Metadata',
                render: () => (
                  <Tab.Pane>
                    <TileMetadataEditor
                      onDataChange={this.handleMetadataChange}
                      tile={this.state.tileData}
                    />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </Modal.Content>
        <Modal.Actions>
          <Grid columns={2}>
            <Grid.Column style={{ textAlign: 'left' }}>
              <Button
                onClick={() => this.setState({ useRecommendedHeight: true })}
              >
                Use recommended height
              </Button>
              {this.state.useRecommendedHeight ? <Icon name="check" /> : ''}
              <label htmlFor="select-tile-type">Set type:</label>
              <SelectTileType
                id="select-tile-type"
                tiles={this.state.formData.tiles}
                tile={this.state.tileData}
                onMutateTile={this.onMutateTile}
              />
            </Grid.Column>
            <Grid.Column>
              <Button.Group floated="right">
                <Button color="green" onClick={this.onSave}>
                  Save
                </Button>
                <Button.Or />
                <Button color="red" onClick={this.onCancel}>
                  Cancel
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default ModalEditor;