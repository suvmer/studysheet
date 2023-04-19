export const InfoBlock = ({text, children}) => {
    return <p>
      {text} <mark className="big">{children}</mark>
    </p>;
  }