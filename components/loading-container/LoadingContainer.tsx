import css from './LoadingContainer.module.scss';

const LoadingContainer = () => (
  <div className={css.container}>
    <img src="/assets/quote.gif" alt="Loading..." />
    <div className={css.text}>Loading...</div>
  </div>
);

export default LoadingContainer;
