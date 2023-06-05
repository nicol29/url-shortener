import { useEffect } from "react";
import { useParams } from "react-router";

function Redirect () {
  const { vidId } = useParams();

  useEffect(() => {
    if (vidId) {
      (async () => {
        const response = await fetch(`http://localhost:3000/api/linkTo/${vidId}`);

        window.location.href = await response.json();
      })();
    }
  }, [vidId]);

  return (null);
}

export default Redirect;