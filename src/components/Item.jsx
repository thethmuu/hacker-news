import styled from 'styled-components';
import { StyledButtonSmall } from './Button';

export default function Item({ item, onRemoveItem }) {
  return (
    <StyledItem isDark={false}>
      <StyledColumn width='40%'>
        <a href={item.url}>{item.title}</a>
      </StyledColumn>
      <StyledColumn width='30%'>{item.author}</StyledColumn>
      <StyledColumn width='10%'>{item.num_comments}</StyledColumn>
      <StyledColumn width='10%'>{item.points}</StyledColumn>
      <StyledColumn width='10%'>
        <StyledButtonSmall onClick={() => onRemoveItem(item)}>
          Delete
        </StyledButtonSmall>
      </StyledColumn>
    </StyledItem>
  );
}

// styles
const StyledItem = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
`;

const StyledColumn = styled.span`
  padding: 0 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  a {
    color: inherit;
  }

  width: ${(props) => props.width};
`;
