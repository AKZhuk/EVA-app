import { Component, Dispatch } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { loadData, switchPopUp } from '../../redux/actions';
import { ICorporation, IState } from '../../types';
import Field from '../Field';

class PopUpCorporation extends Component<props> {
  componentDidMount() {
    if (!this.props.CEO) {
      this.props.getCeo(this.props.corpData.ceo_id);
    }
  }

  openCEOView() {
    this.props.switchView(this.props.corpData.id);
  }

  render() {
    return (
      <div className="pop-up__view">
        <Field title={'Name'} value={this.props.corpData.name}></Field>
        <Field title={'Member count'} value={this.props.corpData.member_count}></Field>
        <Field title={'Description'} value={this.props.corpData.description}></Field>
        <Field title={'CEO'} value={this.props.CEO?.name} clickHandler={this.openCEOView.bind(this)}></Field>
      </div>
    );
  }
}

const mapStateToProps = function (state: IState, { id }: { id: number | undefined }) {
  return {
    corpData: state.corporations.find((corp) => corp.id === id) as ICorporation,
    CEO: state.CEOs.find((elem) => elem.corporation_id === id),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getCeo: (ceo_id: number) => dispatch(loadData('CEO', ceo_id)),
    switchView: (corp_id: number) => dispatch(switchPopUp(true, corp_id, 'Ceo')),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type props = PropsFromRedux & {
  id: number | undefined;
};

export default connector(PopUpCorporation);
