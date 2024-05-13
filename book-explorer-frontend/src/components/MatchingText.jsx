import styles from "./MatchingText.module.css";
function MatchingText({ suggestion, userInput, handleClick }) {
  // Find the index of the matching text
  const index = suggestion.toLowerCase().indexOf(userInput.toLowerCase());
  const prefix = suggestion.slice(0, index);
  const match = suggestion.slice(index, index + userInput.length);
  const suffix = suggestion.slice(index + userInput.length);
  return (
    <li onClick={() => handleClick(suggestion)}>
      {prefix}
      <span className={styles.match}>{match}</span>
      {suffix}
    </li>
  );
}
export default MatchingText;
