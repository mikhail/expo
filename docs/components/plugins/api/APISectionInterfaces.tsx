import React from 'react';
import ReactMarkdown from 'react-markdown';

import { InlineCode } from '~/components/base/code';
import { B } from '~/components/base/paragraph';
import { H2, H3Code } from '~/components/plugins/Headings';
import {
  CommentData,
  InterfaceDefinitionData,
  InterfaceValueData,
  MethodSignatureData,
  TypeDefinitionData,
} from '~/components/plugins/api/APIDataTypes';
import {
  CommentTextBlock,
  listParams,
  mdInlineRenderers,
  renderParam,
  resolveTypeName,
  STYLES_OPTIONAL,
} from '~/components/plugins/api/APISectionUtils';

export type APISectionInterfacesProps = {
  data: InterfaceDefinitionData[];
};

const renderInterfaceType = (type?: TypeDefinitionData, signatures?: MethodSignatureData[]) => {
  if (type) {
    return <InlineCode>{resolveTypeName(type)}</InlineCode>;
  } else if (signatures && signatures.length) {
    const { type, parameters } = signatures[0];
    return (
      <InlineCode>
        ({listParams(parameters)}) =&gt; {resolveTypeName(type)}
      </InlineCode>
    );
  }
  return undefined;
};

const renderInterfaceComment = (comment?: CommentData, signatures?: MethodSignatureData[]) => {
  if (signatures && signatures.length) {
    const { type, parameters } = signatures[0];
    return (
      <>
        {parameters.map(param => renderParam(param))}
        <B>Returns: </B>
        <InlineCode>{resolveTypeName(type)}</InlineCode>
      </>
    );
  } else {
    return comment?.shortText ? (
      <ReactMarkdown renderers={mdInlineRenderers}>{comment.shortText}</ReactMarkdown>
    ) : (
      '-'
    );
  }
};

const renderInterfacePropertyRow = ({
  name,
  flags,
  type,
  comment,
  signatures,
}: InterfaceValueData): JSX.Element => (
  <tr key={name}>
    <td>
      <B>
        {name}
        {signatures && signatures.length ? '()' : ''}
      </B>
      {flags?.isOptional ? (
        <>
          <br />
          <span css={STYLES_OPTIONAL}>(optional)</span>
        </>
      ) : null}
    </td>
    <td>{renderInterfaceType(type, signatures)}</td>
    <td>{renderInterfaceComment(comment, signatures)}</td>
  </tr>
);

const renderInterface = ({
  name,
  children,
  comment,
}: InterfaceDefinitionData): JSX.Element | null =>
  children ? (
    <div key={`interface-definition-${name}`}>
      <H3Code>
        <InlineCode>{name}</InlineCode>
      </H3Code>
      <CommentTextBlock comment={comment} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{children.map(renderInterfacePropertyRow)}</tbody>
      </table>
    </div>
  ) : null;

const APISectionInterfaces: React.FC<APISectionInterfacesProps> = ({ data }) =>
  data?.length ? (
    <>
      <H2 key="interfaces-header">Interfaces</H2>
      {data.map(renderInterface)}
    </>
  ) : null;

export default APISectionInterfaces;
