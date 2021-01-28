function FormRequisicao({onSubmit, ...props}) {
    return <form onSubmit={onSubmit}>{props.children}</form>
}

export default FormRequisicao;