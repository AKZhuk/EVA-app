import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { switchPopUp } from '../../redux/actions';
import { IState } from '../../types';
import PopUpCEOView from './PopUpCEOView';
import PopUpCorporation from './PopUpCorporation';

const PopUp = () => {
  const dispatch = useDispatch();
  const popUp = useSelector((state: IState) => state.popUp);

  const closePopUp = (e: React.MouseEvent) => {
    const elem = e.target as HTMLElement;
    if (!elem.classList.contains('close')) return;
    dispatch(switchPopUp(false));
    document.body.classList.remove('not-scrollable');
  };

  const goBack = () => [dispatch(switchPopUp(true, popUp.id, 'Corporation'))];

  return (
    <div className="pop-up__cover close" onClick={closePopUp}>
      <div className="pop-up">
        <header className="pop-up_header">
          <span className="material-icons close">close</span>
          {popUp.view === 'Ceo' ? (
            <>
              <h4 className="pop-up__title">CEO</h4>
              <span className="material-icons" onClick={goBack}>
                arrow_back
              </span>
            </>
          ) : (
            <>
              <h4 className="pop-up__title">Corporation</h4>
              <span></span>
            </>
          )}
        </header>
        <section className="pop-up__body">
          {popUp.isOpen && (
            <CSSTransition in={popUp.view === 'Ceo'} timeout={300} classNames="pop-up__carousel">
              <div className="pop-up__view-wrapper">
                <PopUpCorporation id={popUp.id} />
                {popUp.view === 'Ceo' && <PopUpCEOView id={popUp.id} />}
              </div>
            </CSSTransition>
          )}
        </section>
      </div>
    </div>
  );
};

export default PopUp;
