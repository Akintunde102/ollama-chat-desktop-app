
interface SimpleErrorProps {
  error: string;
}

const SimpleError = ({ error }: SimpleErrorProps) => {
  if (!error) {
    return <></>
  }

  return (
    <span className="ml-4 text-orange-500">&lt;&lt;{error}&gt;&gt;</span>
  )

};

export default SimpleError;