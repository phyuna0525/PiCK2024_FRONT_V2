import { theme } from '@/styles/theme';
import styled from 'styled-components';

interface ChangeProps {
  text: string;
  name: string;
}

interface TextareaProps {
  label?: string;
  onChange: ({ text, name }: ChangeProps) => void;
  name: string;
  value: string;
  placeholder: string;
}

export const Textarea = ({
  name,
  onChange,
  label,
  value,
  placeholder,
}: TextareaProps) => {
  return (
    <TextareaWrap>
      {label && <InputLabel>{label}</InputLabel>}
      <WriteTextarea
        name={name}
        onChange={(e) => onChange({ text: e.target.value, name })}
        placeholder={placeholder}
        value={value}
      />
    </TextareaWrap>
  );
};

const WriteTextarea = styled.textarea`
  max-width: 100%;
  height: 172px;
  resize: none;
  font-size: ${theme.font.caption[1].size};
  background-color: ${theme.color.gray[50]};
  border-radius: 12px;
  padding: 20px 20px;
  &::placeholder {
    font-size: ${theme.font.caption[1].size};
    color: ${theme.color.gray[300]};
  }
  outline: none;
  caret-color: ${theme.color.main[500]};
`;

const InputLabel = styled.p`
  font-size: ${theme.font.label[1].size};
  font-weight: ${theme.font.label[1].fontweight};
`;

const TextareaWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
