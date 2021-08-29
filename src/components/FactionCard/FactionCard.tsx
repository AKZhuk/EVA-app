import { MouseEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { loadData, switchPopUp } from '../../redux/actions';
import { IFactionCardProps, IState } from '../../types';
import Field from '../Field';

const FactionCard = ({ data }: IFactionCardProps) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const nodeRef = useRef(null);
  let corporation = useSelector((state: IState) => state.corporations.find((corp) => corp.id === data.corporation_id));
  let solarSystem = useSelector((state: IState) =>
    state.solarSystems.find((system) => system.system_id === data.solar_system_id)
  );

  const handleClick = async () => {
    if (!solarSystem) {
      dispatch(loadData('solar-system', data.solar_system_id));
    }
    if (!corporation) {
      dispatch(loadData('corporation', data.corporation_id));
    }
    setIsActive(!isActive);
  };

  const handleOpenPopUp = (e: MouseEvent<HTMLElement>) => {
    document.body.classList.add('not-scrollable');
    e.stopPropagation();
    dispatch(switchPopUp(true, data.corporation_id, 'Corporation'));
  };

  return (
    <div className={'faction'} onClick={handleClick}>
      <h4 className="faction_name">{data.name}</h4>
      <CSSTransition nodeRef={nodeRef} in={isActive} timeout={300} classNames="faction__detail">
        <div ref={nodeRef} className="faction__detail">
          <span className="title">Description:</span>
          <p className="faction__description">{data.description}</p>
          <Field title="Solar system" value={solarSystem?.name}></Field>
          <Field title="Corporation name" value={corporation?.name} clickHandler={handleOpenPopUp} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default FactionCard;
